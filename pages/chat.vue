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
          height="calc(100vh - 100px)"
        >
          <v-list :key="conversation.key" color="transparent" class="messages-container">
            <template v-for="(item, index) in conversation.rows">
              <v-list-item :key="index">
                <div
                  class="message"
                  :class="
                    item.clientUserId === userClientId ? 'sent ml-auto' : 'received'
                  "
                >
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
  layout: "chat",
  data() {
    return {
      sdk: {
        key: this.$route.query.k,
        isLoaded: false,
        auth: false,
      },
      userId: Date.now() + Math.random().toString().replaceAll(".", ""),
      userClientId: Date.now() + Math.random().toString().replaceAll(".", ""),
      conversation: {
        key: 0,
        rows: [],
      },
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
    },
    initIO() {
      const vm = this;
      const socket = io(process.env.API_URL);
      const userClientId = this.userClientId;

      socket.on("connected", function () {
        socket.emit("connected", {
          clientUser: userClientId,
        });
      });

      socket.on("chat_message", function (stream) {
        const data = stream.data;
        vm.onChatMessageIncoming(data);
      });
    },
    onChatMessageIncoming(data) {
      this.conversation.rows.push(data);
      this.conversation.key++;
    },
    async sendMessage() {
      if (this.form.message === "") {
        return;
      }

      // conversation message
      const message = {
        body: this.form.message,
        type: "text",
      };
      const conversationMessage = {
        chatId: Date.now() + Math.random().toString().replaceAll(".", ""),
        clientUserId: this.userClientId,
        clientUserName: "",
        message: {
          ...{
            id: "",
            from: {
              user: "guest",
              refId: this.userId,
            },
          },
          ...message,
        },
        lastMessage: message.body,
        updatedAt: Date.now(),
        isSending: true,
      };

      this.conversation.rows.push(conversationMessage);
      this.form.message = "";

      // scroll to bottom
      this.scrolToBottom();

      // send message
      const item = {
        from: {
          user: "guest",
          refId: this.userClientId,
        },
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

      // update last message
      const resData = sendMessage.data.data;
      const lasIndexMessage = this.conversation.rows.length - 1;
      this.conversation.rows[lasIndexMessage] = {
        ...resData,
        ...{ isSending: false },
      };
      this.conversation.key++;
    },
    scrolToBottom() {
      setTimeout(() => {
        const element = document.getElementById("chatContainer");
        element.scrollTop = element.offsetHeight + element.scrollHeight;
      }, 100);
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
