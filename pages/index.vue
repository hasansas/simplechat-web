<template>
  <diV class="fill-height">
    <v-app-bar fixed app flat color="white">
      <v-spacer></v-spacer>
      <v-btn depressed outlined color="primary" to="/login">
        <span>Login</span>
        <v-icon size="16">ri-arrow-right-line </v-icon>
      </v-btn>
    </v-app-bar>
    <v-card flat class="fill-height grow d-flex align-center justify-center">
      <div class="text-center">
        <div class="logo-x-large mb-8">
          <Logo />
        </div>
        <div class="display-1 primary--text font-weight-medium ml-2">SimpleChat</div>
      </div>
    </v-card>
  </diV>
</template>

<script>
export default {
  head: {
    script: [
      {
        innerHTML: `(function (d) {
            const t = 'script';
            const g = d.createElement(t);
            g.src = 'http://localhost:3355/sdk.js';
            d.body.appendChild(g);
            g.onload = function () {
              SIMPLECHAT.init('12345');
            }
          })(document)`,
        body: true,
      },
    ],
  },
};
</script>
