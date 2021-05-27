<template>
  <div class="api-key">
    <h2>Sandbox API Key</h2>
    <form @submit="enterKey">
      <div class="info">
        Activate the Lithic API and get your Sandbox API Key from
        <a href="https://lithic.com/account" target="_blank">
          Lithic.com/account
        </a>
        or
        <a href="https://privacy.com/account" target="_blank">
          Privacy.com/account
        </a>
      </div>
      <img src="@/assets/ApiKey.png" />
      <div class="info">
        go to the <code>.env</code> file, assign
        <code>VUE_APP_API_KEY</code>
        to the Sandbox API Key and rerun
        <code>npm run serve</code>
      </div>
      <br />
      <div class="info">or for quick use, enter the key below</div>
      <input
        required
        v-model="apiKey"
        placeholder="Enter a Sandbox API Key..."
      />
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ApiKeyPage",
  data() {
    return {
      apiKey: ""
    };
  },
  methods: {
    enterKey: async function(e) {
      e.preventDefault();
      await this.$store.commit("setApiKey", this.apiKey);
      const card = await this.$store.dispatch("apiRequest", {
        url: "/card",
        logging: false,
        data: {
          page_size: 1
        }
      });

      if (!card) {
        this.apiKey = "";
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.api-key {
  box-sizing: border-box;
  padding: 35px;
  max-width: 460px;
  margin: 0 auto;

  form {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 20px;

    img {
      outline: 5px solid #f0eeeb;
      width: 100%;
    }

    > .info {
      font-size: 16px;
      line-height: 1.6;

      code {
        font-size: 14px;
        color: var(--color, black);
        background: var(--light, #f0eeeb);
        padding: 4px;
        border-radius: 4px;
      }

      a {
        font-size: 16px;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
  }

  button {
    width: 100%;
  }
}
</style>
