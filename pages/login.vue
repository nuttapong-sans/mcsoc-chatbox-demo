<template>
  <div class="s-container">
    <div class="sign-in-container">
      <div class="text-center">
        <h3>Sign in</h3>
      </div>
      <b-form @submit.prevent="signIn">
        <b-form-group label="Email" label-for="email">
          <b-form-input
            id="email"
            type="email"
            placeholder="Enter email"
            required
            v-model="signInData.email"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Password" label-for="password">
          <b-form-input
            id="password"
            type="password"
            placeholder="Enter password"
            required
            v-model="signInData.password"
          ></b-form-input>
        </b-form-group>
        <div class="text-center">
          <b-button type="submit">Sign In</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      signInData: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signIn() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.signInData
        });
        console.log(response);
        this.$router.replace({name:"index"});
      } catch (error) {
          console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.s-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.sign-in-container {
  width: 500px;
  border: 1px solid black;
  padding: 20px;
  border-radius: 8px;
}
</style>
