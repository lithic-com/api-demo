<template>
  <div class="api-key">
    <h2 class="title">Sandbox API Key</h2>
    <form @submit="enterKey">
      <div class="section">
        <p class="tooltip">1</p>
        <div class="right">
          <p class="section-text">
            Activate the Lithic API and get your Sandbox API key from
            <a
              href="https://app.lithic.com/login?goto=%2Faccount"
              target="_blank"
              >Lithic.com/account</a
            >
            go to the <code>.env</code> file, assign
            <code>VUE_APP_API_KEY</code> to the Sandbox API Key and rerun
            <code>npm run serve</code>
          </p>
        </div>
      </div>
      <hr />
      <div class="section">
        <p class="tooltip">2</p>
        <div class="right">
          <p class="section-text">
            To access our self-hosted demo, enter your Sandbox API key below
          </p>
          <div class="input-container" @click="focusInput">
            <p class="key-text">Sandbox Key</p>
            <input
              type="text"
              v-model="apiKey"
              placeholder="12345"
              ref="input"
              required
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit &rarr;</button>
    </form>
    <img src="../assets/apiKey.png" class="api-key-image" />
  </div>
</template>

<script>
export default {
  name: "ApiKeyPage",
  data() {
    return {
      apiKey: "",
    };
  },
  methods: {
    enterKey: async function (e) {
      e.preventDefault();
      await this.$store.commit("setApiKey", this.apiKey);
      const card = await this.$store.dispatch("apiRequest", {
        url: "/card",
        logging: false,
        data: {
          page_size: 1,
        },
      });

      if (!card) {
        this.apiKey = "";
      } else {
        this.$router.push("/");
      }
    },
    focusInput() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style scoped lang="scss">
.api-key {
  box-sizing: border-box;
  padding: 0 200px;
  margin: 0 auto;
  .title {
    font-size: 48px;
  }
  form {
    display: flex;
    flex-direction: column;
    .section {
      display: grid;
      grid-template-columns: 1fr 20fr;
      font-size: 16px;
      .tooltip {
        background: var(--tool-tip, rgb(76, 75, 72));
        width: 38px;
        height: 38px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .right {
        margin-left: 32px;
        .section-text {
          line-height: 27.2px;
          font-size: 16px;
          code {
            border-radius: 2px;
            padding: 1px 4px;
            background: var(--code-accent, rgb(76, 75, 72));
          }
          a {
            color: #f05f3a;
            text-decoration: none;
            font-size: 16px;
          }
        }
        .input-container {
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(196, 196, 196, 0.2);
          .key-text {
            opacity: 0.5;
            width: 100px;
          }
          input {
            border: none;
            outline: none;
            width: 100%;
            margin-left: 50px;
            background-color: transparent;
            color: var(--color, #fff);
          }
        }
      }
    }

    button {
      color: #f05f3a;
      font-size: 16px;
      text-decoration: underline;
      padding: 0px;
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      align-self: flex-end;
      margin-top: 12px;
    }
    hr {
      border: none;
      border-top: 1px solid rgba(196, 196, 196, 0.2);
      width: 100%;
    }
  }
  .api-key-image {
    width: 100%;
    margin-top: 36px;
    object-fit: contain;
    border-radius: 12px;
  }
}
</style>
