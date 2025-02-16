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
  // watch: {
  //   isIOModuleLoaded: {
  //     handler: function (isIOloaded) {
  //       if (isIOloaded) {
  //         this.initIO();
  //       }
  //     },
  //     deep: true,
  //   },
  // },
  // methods: {
  //   initIO() {
  //     const socket = io(process.env.API_URL);
  //     const user = this.user;

  //     socket.on("connected", function () {
  //       socket.emit("connected", {
  //         clientUser: user.clientId,
  //       });
  //     });

  //     this.onChatMessageIncoming(socket);
  //   },
  //   onChatMessageIncoming(socket) {
  //     const vm = this;
  //     socket.on("chat_message", function (stream) {
  //       const data = stream.data;
  //       vm.$nuxt.$emit("indexChatIncomingMessage", data);
  //     });
  //   },
  // },
  // beforeRouteLeave(to, from, next) {
  //   const socket = io(process.env.API_URL);
  //   socket.disconnect();
  //   next();
  // },
};
</script>
