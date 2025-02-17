<template>
  <app-base-layout>
    <Nuxt v-if="isIOModuleLoaded" />
  </app-base-layout>
</template>

<script>
import appBaseLayout from "~/layouts/base.vue";

export default {
  components: { appBaseLayout },
  head() {
    return {
      script: [
        {
          hid: "io",
          src: process.env.API_URL + "/socket.io/socket.io.js",
          defer: true,
          callback: () => {
            this.isIOModuleLoaded = true;
          },
        },
      ],
    };
  },
  data() {
    return {
      isIOModuleLoaded: false,
    };
  },
};
</script>
