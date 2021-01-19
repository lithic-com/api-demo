<a href="https://privacy.com" target="_blank">
  <img src="./src/assets/privacy-logo.svg" width="100">
</a>

# Developer API Demo
A simple web app that showcases Privacy.com's [Developer API](https://privacy.com/developer/docs) implemented with Vue and Express. Download the project and run it locally or check it out at [https://demo.privacy.com/](https://demo.privacy.com/)

The Privacy developer API provides a predictable and programmatic interface to create and configure virtual cards. Get real-time payment data, programmatically issue cards, configure card permissions, and set spend limits all through the API.

## Overview
The project is a simplified recreation of the main [Privacy.com](https://privacy.com) site in Vue with an Express backend. The right sidebar prints every API call the project makes to the Developer API to illustrate what is going on for every page. This demo covers the following endpoints:
| Endpoints      | Description |
| -------------- | ----------- |
| /card          | Create, update, and fetch virtual cards with limits, vendor locks, and more. |
| /embed/card    | To comply with Payment Card Industry Data Security Standards (PCI DSS), retrieving a card's PAN number, expiration date, and CVV requires rendering an iframe, which we demonstrate here. Learn more about how we stay PCI compliant in our [documentation](https://privacy.com/developer/docs#pci-compliance) |
| /transaction   | Fetch transactions from all your virtual cards. |
| /fundingsource | Create and fetch funding cards and accounts. |
| /simulate      | While using our sandbox, use our `/simulate` endpoint to create transactions and modify their states to further emulate real-world interaction. |

## Running the Project
You can run the project locally or in Docker containers. To start, first update the `.env` file with your [sandbox API key](https://privacy.com/account). This step is optional but will persist your api-key.

### Running Locally

Install dependencies with npm:
```
npm install
```
The demo uses both Vue and Express which can be run locally using:
```
npm run serve
```
Alternatively, you can run in separate windows
```
npm run serve:app
```
```
npm run serve:server
```
to run the two processes separately.

### Running in Docker
Launch the docker containers using docker-compose.
```
docker-compose up -d
```

## Images

### Home Page
![](./src/assets/home.png?raw=true "Home Page")

### Cards Page
![](./src/assets/cards.png?raw=true "Cards Page")

### Card Page
![](./src/assets/card.png?raw=true "Card Page")

### Transactions Page
![](./src/assets/transactions.png?raw=true "Transactions Page")
