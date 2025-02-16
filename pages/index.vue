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
        <div class="logo-x-large mb-16">
          <Logo />
        </div>
        <div class="display-1 primary--text font-weight-medium">SimpleChat</div>
        <div class="subtitle-1 primaryy--text font-weight-light mt-2">
          Instant Support, Real Conversations!
        </div>
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
            const b = 'http://localhost:3355';
            const k = '123456';
            const s = d.createElement('script');
            s.src = b + '/sdk.js';
            d.body.appendChild(s);
            s.onload = function () {
              SIMPLECHAT.init({
                base_url: b,
                key: k
              });
            }
          })(document)`,
        body: true,
      },
    ],
  },
};
</script>
