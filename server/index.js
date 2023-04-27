const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = process.env.VUE_APP_API_KEY;
const apiBaseURL = "https://sandbox.lithic.com/v1";

const callApi = async (request, response) => {
  const { method, path, query, body, headers } = request;
  try {
    const req = {
      headers: {
        Authorization: headers.authorization || `api-key ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: method.toLowerCase(),
      baseURL: apiBaseURL,
      url: path,
    };

    if (method === "GET") {
      req.params = query;
    } else {
      req.data = body;
    }

    const { data } = await axios(req);

    response.status(200);
    response.send({ ...data, displayURL: apiBaseURL + path });
  } catch (err) {
    response.status(err.response.status);
    response.send(err.response.data);
  }
};

// Learn why this is necessary at https://docs.lithic.com/pci-compliance.html
const hostedCard = (request, response) => {
  const { headers, query } = request;
  const { card_token } = query;
  const embed_request_json = JSON.stringify({
    css: `${process.env.VUE_APP_API}/embedded.css`,
    token: card_token,
  });

  const passedApiKey =
    headers.authorization && headers.authorization.replace("api-key ", "");
  const embed_request = Buffer.from(embed_request_json).toString("base64");
  const hmac = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(embed_request_json, passedApiKey || apiKey)
  );

  const displayURL = `${apiBaseURL}/embed/card`;
  const url = `${displayURL}?embed_request=${embed_request}&hmac=${hmac}`;

  response.send({ displayURL, url, params: { embed_request, hmac } });
};

app.all("/card", callApi);
app.all("/fundingsource*", callApi);
app.get("/transaction*", callApi);
app.post("/simulate/*", callApi);
app.get("/embed/card", hostedCard);

app.listen(port);
