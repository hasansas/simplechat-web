<template>
  <v-container class="fill-height">
    <v-card flat class="login-container mx-auto">
      <div class="d-flex align-center mb-16">
        <v-spacer></v-spacer>
        <NuxtLogo />
        <div class="display-1 primary--text font-weight-medium ml-2">AdmStarter</div>
        <v-spacer></v-spacer>
      </div>
      <v-card flat width="480" color="transparent" class="primary-shadow mx-auto">
        <v-card flat rounded="xxl" class="pa-16">
          <v-card-title class="d-block text-center headline pa-0 mb-16">
            Sign Into Your Account
          </v-card-title>
          <v-form @submit.stop.prevent="login" ref="loginForm" class="mt-4">
            <!-- email * -->
            <v-text-field
              v-model="form.email"
              id="login_email"
              type="email"
              :rules="rules.email"
              :error-messages="form.errorMessages"
              label="Email"
              placeholder="john@example.com"
              required
              :disabled="disabledForm"
            >
              <template v-slot:prepend-inner>
                <v-icon class="mr-4">ri-at-line</v-icon>
              </template>
            </v-text-field>

            <!-- Password * -->
            <v-text-field
              id="login_password"
              v-model="form.password"
              type="password"
              :rules="rules.password"
              :error-messages="form.errorMessages"
              label="Password"
              :append-icon="showLoginPassword ? 'ri-eye-off-line' : 'ri-eye-line'"
              @click:append="togglePassword('login_password')"
              required
              :disabled="disabledForm"
            >
              <template v-slot:prepend-inner>
                <v-icon class="mr-4">ri-key-line</v-icon>
              </template>
            </v-text-field>

            <!-- error message -->
            <v-alert
              v-if="form.error"
              text
              icon="ri-notification-3-line"
              type="error"
              class="mt-4"
            >
              {{ form.errorMsg }}
            </v-alert>

            <div class="text-center py-4">
              <nuxt-link to="#">Forgot password?</nuxt-link>
            </div>
            <v-card-actions>
              <v-btn
                type="submit"
                color="primary"
                depressed
                rounded
                x-large
                block
                :loading="disabledForm"
              >
                MASUK
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-card>

      <div class="text-center mt-8 py-2">
        <span>Don't have an account?</span>
        <nuxt-link to="#">Register</nuxt-link>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  middleware: "login",
  head() {
    return {
      title: "Login",
    };
  },
  data() {
    return {
      pageTitle: "Login",
      breadcrumbs: [
        {
          text: "Dashboard",
          disabled: false,
          to: "/",
        },
        {
          text: "Login",
          disabled: true,
          to: null,
        },
      ],
      form: {
        error: false,
        errorMsg: "",
        email: "",
        password: "",
      },
      rules: {
        email: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              v
            ) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Name is required"],
      },
      showLoginPassword: false,
      disabledForm: false,
      snackbar: {
        show: false,
        text: "",
        color: null,
      },
    };
  },
  methods: {
    togglePassword(elId) {
      var el = document.getElementById(elId);
      if (el.type === "password") {
        el.type = "text";
      } else {
        el.type = "password";
      }
      if (elId == "login_password") {
        this.showLoginPassword = !this.showLoginPassword;
      }
    },
    async login() {
      const vm = this;

      if (!this.$refs.loginForm.validate()) return;

      // disable form
      this.disabledForm = true;

      // login user
      const _login = await this.$store.dispatch("users/login", {
        input: this.form,
      });

      // enable form
      this.disabledForm = false;
      this.form.error = false;
      this.form.errorMsg = "";

      // handle error
      if (!_login.success) {
        const data = _login.data;
        let message = data.message;

        if (typeof data.error !== "undefined" && Array.isArray(data.error)) {
          message = "";
          for (let index = 0; index < data.error.length; index++) {
            const err = data.error[index];
            message += `${err.param} ${err.msg}, `;
          }
          message = message.substring(0, message.length - 2);
        }

        this.form.errorMsg = message;
        this.form.error = true;
        return;
      }

      // go to dashboard
      this.$router.push({
        path: "/admin",
      });
    },
  },
};
</script>

<style lang="scss">
.login-container {
  .nuxt-logo {
    height: 32px !important;
  }
}
</style>
