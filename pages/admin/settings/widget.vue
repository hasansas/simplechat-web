<template>
  <diV>
    <v-app-bar fixed app flat color="white"> </v-app-bar>
    <v-container class="main-container">
      <h2 class="display-1 mb-4">Your widget is ready!</h2>
      <p>Copy this code and place it before the &lt;/body&gt; tag on your page:</p>
      <v-card
        flat
        rounded="lg"
        width="600"
        color="grey lighten-3"
        class="overflow-auto py-8 pb-4 px-8 mt-8"
      >
        <pre class="code-block black--text">
&lt;script&gt;
&nbsp;&nbsp;(function (d) {
&nbsp;&nbsp;&nbsp;&nbsp;const b = '{{ baseUrl }}';
&nbsp;&nbsp;&nbsp;&nbsp;const k = '{{ client.sdkKey }}';
&nbsp;&nbsp;&nbsp;&nbsp;const s = d.createElement('script');
&nbsp;&nbsp;&nbsp;&nbsp;s.src = b + '/sdk.js';
&nbsp;&nbsp;&nbsp;&nbsp;d.body.appendChild(s);
&nbsp;&nbsp;&nbsp;&nbsp;s.onload = function () {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIMPLECHAT.init({
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base_url: b,
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key: k
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;});
&nbsp;&nbsp;&nbsp;&nbsp;}
&nbsp;&nbsp;})(document)
&lt;/script&gt;
        </pre>
      </v-card>
    </v-container>
  </diV>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "admin",
  computed: {
    ...mapGetters({
      user: "users/user",
      client: "client/data",
    }),
  },
  data() {
    return {
      baseUrl: process.env.APP_BASE_URL,
    };
  },
};
</script>

<style lang="scss">
.code-block {
  font-size: 0.85rem;
}
</style>
