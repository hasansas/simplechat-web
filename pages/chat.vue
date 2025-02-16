<template>
  <diV class="fill-height overflow-hidden">
    <v-card
      v-if="!sdk.isLoaded"
      flat
      class="fill-height d-flex align-center justify-center"
    >
      <v-card flat height="32" width="72">
        <div class="loader"></div>
      </v-card>
    </v-card>
    <template v-else>
      <v-card
        v-if="!sdk.auth"
        flat
        class="fill-height d-flex align-center justify-center"
      >
        <div class="text-center">
          <div class="logo-x-large logo-disable mb-8">
            <Logo />
          </div>
          <div class="grey--text title font-weight-light">
            Cannot connect to live chat
          </div>
        </div>
      </v-card>
      <v-navigation-drawer
        v-else
        :value="true"
        stateless
        floating
        app
        width="100%"
        class="chat-screen grow elevation-0 overflow-hidden"
      >
        <template v-slot:append>
          <v-card flat color="transparent" class="pa-4">
            <v-form class="pa-2" @submit.stop.prevent="sendMessage">
              <v-card flat outlined class="d-flex align-center pa-2 rounded-xxl">
                <v-btn icon>
                  <v-icon>ri-user-smile-line</v-icon>
                </v-btn>
                <v-text-field
                  v-model="form.message"
                  hide-details
                  rounded
                  dense
                  class="pa-0 ma-0"
                ></v-text-field>
                <v-btn depressed icon small type="submit" color="white" class="mr-2">
                  <v-icon color="grey darken-1">ri-send-plane-2-line</v-icon>
                </v-btn>
              </v-card>
            </v-form>
          </v-card>
        </template>
        <v-card
          flat
          id="chatContainer"
          color="transparent"
          class="overflow-y-auto"
          height="calc(100vh - 102px)"
        >
          <v-list color="transparent" class="messages-container">
            <template v-for="(item, index) in conversation">
              <v-list-item :key="index">
                <div class="message" :class="item.isMe ? 'sent ml-auto' : 'received'">
                  <div v-if="item?.isSending" class="py-2 px-3">
                    <v-card flat color="transparent" width="40" height="16">
                      <div class="loader"></div>
                    </v-card>
                  </div>
                  <div v-else class="text">
                    <span>{{ item.message.body }}</span>
                  </div>
                </div>
              </v-list-item>
              <v-spacer :key="`d-${index}`" class="mb-3"></v-spacer>
            </template>
          </v-list>
        </v-card>
      </v-navigation-drawer>
    </template>
  </diV>
</template>

<script>
export default {
  data() {
    return {
      sdk: {
        key: this.$route.query.k,
        isLoaded: false,
        auth: false,
      },
      userId: Date.now() + Math.random().toString().replaceAll(".", ""),
      userClientId: Date.now() + Math.random().toString().replaceAll(".", ""),
      conversation: [
        {
          id: "4f1d6e2b-d67e-4d65-81ad-4d464b1be581",
          message: {
            body: "halo",
            type: "text",
          },
          isMe: false,
          createdAt: "2025-01-04T05:24:19.541Z",
        },
        {
          id: "74c1c57c-06dd-461c-bfb1-79f2ed1b87bb",
          message: {
            sendTo: "6285743603758",
            type: "text",
            body:
              "Selamat datang {{contact_name}} di layanan Vemoblast, One Stop Digital Marketing Tools untuk segala kebutuhan bisnis digital Anda.\nSilakan pilih menu berikut dengan mengetikkan angka sesuai dengan pilihan menunya:\n1. Informasi Produk dan Layanan\n2. Informasi Kerja Sama / Partnership\n3. Informasi Promo\n4. Layanan Keluhan Pelanggan\n5. Dokumentasi Vemoblast\n6. AI Assistant Vemoblast",
          },
          isMe: true,
          createdAt: "2025-01-04T05:24:19.541Z",
        },
        {
          id: "75c065cb-2b05-4ff9-bab7-30ef94a7c0ae",
          message: {
            sendTo: "6285743603758",
            type: "text",
            body:
              "Sorry, because we did not receive any response, we are ending this conversation. Thank you for contacting us",
          },
          isMe: true,
          createdAt: "2025-01-04T05:25:20.633Z",
        },
        {
          id: "4f1d6e2b-d67e-4d65-81ad-4d464b1be581",
          message: {
            body: "halo",
            type: "text",
          },
          isMe: false,
          createdAt: "2025-01-04T05:24:19.541Z",
        },
        {
          id: "74c1c57c-06dd-461c-bfb1-79f2ed1b87bb",
          message: {
            sendTo: "6285743603758",
            type: "text",
            body:
              "Selamat datang {{contact_name}} di layanan Vemoblast, One Stop Digital Marketing Tools untuk segala kebutuhan bisnis digital Anda.\nSilakan pilih menu berikut dengan mengetikkan angka sesuai dengan pilihan menunya:\n1. Informasi Produk dan Layanan\n2. Informasi Kerja Sama / Partnership\n3. Informasi Promo\n4. Layanan Keluhan Pelanggan\n5. Dokumentasi Vemoblast\n6. AI Assistant Vemoblast",
          },
          isMe: true,
          createdAt: "2025-01-04T05:24:19.541Z",
        },
        {
          id: "75c065cb-2b05-4ff9-bab7-30ef94a7c0ae",
          message: {
            sendTo: "6285743603758",
            type: "text",
            body:
              "Sorry, because we did not receive any response, we are ending this conversation. Thank you for contacting us",
          },
          isMe: true,
          createdAt: "2025-01-04T05:25:20.633Z",
        },
      ],
      form: {
        message: "",
      },
    };
  },
  methods: {
    async sdkAuth() {
      const sdkKey = this.sdk.key;
      const auth = await this.$store.dispatch("chats/auth", { sdkKey });
      this.sdk.isLoaded = true;

      if (!auth.success) {
        // ...
        return;
      }

      this.initIO();
      this.sdk.auth = true;

      this.scrolToBottom();
    },
    initIO() {
      const socket = io(process.env.API_URL);
      const userClientId = this.userClientId;

      socket.on("connected", function () {
        socket.emit("connected", {
          clientUser: userClientId,
        });
      });

      this.onChatMessageIncoming(socket);
    },
    async sendMessage() {
      // conversation message
      const message = {
        body: this.form.message,
        type: "text",
      };
      const conversationMessage = {
        id: Date.now() + Math.random().toString().replaceAll(".", ""),
        message: message,
        isMe: true,
        isSending: true,
        createdAt: Date.now(),
      };

      this.conversation.push(conversationMessage);
      this.form.message = "";

      // send message
      const item = {
        from: this.userClientId,
        message: message,
      };

      const sendMessage = await this.$store.dispatch("chats/sendMessage", {
        key: this.sdk.key,
        body: item,
      });

      if (!sendMessage) {
        conversationMessage.isSending = false;
        // TODO: handle error
        return;
      }
      conversationMessage.isSending = false;

      // scroll to bottom
      this.scrolToBottom();
    },
    scrolToBottom() {
      setTimeout(() => {
        const element = document.getElementById("chatContainer");
        element.scrollTop = element.offsetHeight + element.scrollHeight;
      }, 100);
    },
    onChatMessageIncoming(socket) {
      const vm = this;
      socket.on("chat_message", function (stream) {
        const data = stream.data;
        vm.$nuxt.$emit("indexChatIncomingMessage", data);
      });
    },
  },
  mounted() {
    this.sdkAuth();
  },
  beforeRouteLeave(to, from, next) {
    const socket = io(process.env.API_URL);
    socket.disconnect();
    next();
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
}
</style>
