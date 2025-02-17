<template>
  <v-sheet height="100vh" class="d-flex overflow-hidden">
    <!-- list of chat  -->
    <v-navigation-drawer v-model="chat.drawer" stateless width="400" class="chats">
      <template v-slot:prepend>
        <v-toolbar flat extended extension-height="100" color="transparent">
          <v-toolbar-title class="headline">Live Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon small>
            <v-icon size="20">ri-chat-forward-line</v-icon>
          </v-btn>
          <v-btn icon small>
            <v-icon size="20">ri-more-2-fill</v-icon>
          </v-btn>
          <template v-slot:extension>
            <v-card flat color="transparent" width="100%">
              <v-text-field
                outlined
                clearable
                hide-details
                dense
                placeholder="Search"
                class="mb-4"
              >
                <template v-slot:prepend-inner>
                  <v-icon size="16" class="mt-1 mr-2"> ri-search-line </v-icon>
                </template>
              </v-text-field>
              <v-tabs v-model="chat.tabs" hide-slider :show-arrows="false" height="32">
                <v-tab class="caption"> All </v-tab>
                <v-tab class="caption mx-2"> Assigned to me </v-tab>
                <v-tab class="caption"> Unassigned </v-tab>
              </v-tabs>
            </v-card>
          </template>
        </v-toolbar>
      </template>
      <v-tabs-items v-model="chat.tabs">
        <v-tab-item>
          <v-list>
            <v-list-item
              v-for="(item, index) in chat.rows"
              :key="index"
              @click="selectChat(item)"
            >
              <v-list-item-avatar
                size="48"
                :color="stringToColor(item.clientUserId)"
                class="mr-4"
              >
                <v-icon size="16" dark> ri-user-3-line </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> {{ item.clientUserName }} </v-list-item-title>
                <v-list-item-subtitle> {{ item.lastMessage }} </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <div class="caption primary--text">
                  {{ $moment(item.updatedAt).format("hh:mm a") }}
                </div>
                <div>
                  <v-avatar
                    size="8"
                    :color="
                      item.status === 'offline' ? 'pink lighten-2' : 'green lighten-1'
                    "
                  ></v-avatar>
                </div>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-tab-item>
        <v-tab-item>
          <v-list>
            <v-list-item>There are no chat right now</v-list-item>
          </v-list>
        </v-tab-item>
        <v-tab-item>
          <v-list>
            <v-list-item>There are no chat right now</v-list-item>
          </v-list>
        </v-tab-item>
      </v-tabs-items>
    </v-navigation-drawer>

    <!-- chat form -->
    <v-card
      v-if="chat.selected === null"
      flat
      class="grow d-flex align-center justify-center mb-16"
    >
      <div class="text-center">
        <div class="logo-x-large logo-disable mb-8">
          <Logo />
        </div>
        <div>Please select a chat conversation</div>
      </div>
    </v-card>
    <v-navigation-drawer
      v-else
      :value="true"
      stateless
      floating
      class="chat-screen grow elevation-0"
    >
      <template v-slot:prepend>
        <v-toolbar flat :color="$vuetify.theme.dark ? '#363636' : 'white'">
          <v-list-item class="pa-0">
            <v-list-item-avatar size="48" color="pink lighten-3" class="mr-4">
              <v-icon size="16" dark> ri-user-3-line </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ chat.selected.clientUserName }}
              </v-list-item-title>
              <v-list-item-subtitle> Not in contact </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-btn v-if="!contactInfo.drawer" icon @click="contactInfo.drawer = true">
            <v-icon>ri-arrow-left-s-line </v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
      </template>
      <template v-slot:append>
        <v-card flat color="transparent" class="pa-4">
          <v-form class="pa-2" @submit.stop.prevent="sendMessage">
            <v-card flat outlined class="d-flex align-center pa-2 rounded-xxl">
              <v-btn icon>
                <v-icon>ri-attachment-2</v-icon>
              </v-btn>
              <v-btn icon> <v-icon>ri-user-smile-line</v-icon> </v-btn
              ><v-text-field
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
        height="calc(100vh - 180px)"
      >
        <v-list :key="conversation.key" color="transparent" class="messages-container">
          <template v-for="(item, index) in conversation.rows">
            <v-list-item :key="index">
              <div
                class="message"
                :class="
                  item.clientUserId === userClientId() ? 'sent ml-auto' : 'received'
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

    <!-- contact info -->
    <v-navigation-drawer
      v-if="chat.selected !== null"
      v-model="contactInfo.drawer"
      right
      stateless
      hide-overlay
      app
      width="400"
    >
      <template v-slot:prepend>
        <v-toolbar outlined flat color="transparent" style="margin-left: 1px">
          <v-btn icon @click="contactInfo.drawer = false">
            <v-icon>ri-close-line</v-icon>
          </v-btn>
          <v-toolbar-title> Contact Info</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-tooltip left color="black">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                depressed
                fab
                small
                type="submit"
                color="secondary"
                class="mr-2"
              >
                <v-icon size="16">ri-user-add-line</v-icon>
              </v-btn>
            </template>
            <span>Add to contact</span>
          </v-tooltip>
        </v-toolbar>
      </template>
      <v-card flat color="transparent" class="text-center mt-16">
        <v-list-item-avatar size="160" color="blue lighten-3" class="mr-4">
          <v-icon size="32" dark> ri-user-3-line </v-icon>
        </v-list-item-avatar>
        <v-card-title class="headline d-block">
          {{ chat.selected.clientUserName }}
        </v-card-title>
        <v-card-subtitle> Not in contact </v-card-subtitle>
        <v-card-text class="px-0">
          <v-expansion-panels accordion multiple flat v-model="contactInfo.inputGroup">
            <!-- Basic Info -->
            <v-expansion-panel>
              <v-expansion-panel-header class="subtitle-1">
                Basic Info
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- name -->
                <v-text-field label="Name" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-user-line</v-icon>
                  </template>
                </v-text-field>

                <!-- email -->
                <v-text-field label="Email" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-at-line</v-icon>
                  </template>
                </v-text-field>

                <!-- phone -->
                <v-text-field label="Phone" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-phone-line</v-icon>
                  </template>
                </v-text-field>

                <!-- Job title -->
                <v-text-field label="Job title" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-pass-pending-line</v-icon>
                  </template>
                </v-text-field>
              </v-expansion-panel-content>
              <v-divider class="mx-6"></v-divider>
            </v-expansion-panel>

            <!-- Organization -->
            <v-expansion-panel>
              <v-expansion-panel-header class="subtitle-1">
                Organization
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <!-- name -->
                <v-text-field label="Name" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-building-line</v-icon>
                  </template>
                </v-text-field>

                <!-- email -->
                <v-text-field label="Email" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-at-line</v-icon>
                  </template>
                </v-text-field>

                <!-- phone -->
                <v-text-field label="Phone" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-phone-line</v-icon>
                  </template>
                </v-text-field>

                <!-- Address -->
                <v-text-field label="Address" outlined hide-details dense class="mb-1">
                  <template v-slot:prepend-inner>
                    <v-icon size="16" class="my-1">ri-map-pin-line</v-icon>
                  </template>
                </v-text-field>
              </v-expansion-panel-content>
              <v-divider class="mx-6"></v-divider>
            </v-expansion-panel>

            <!-- Custom Field -->
            <v-expansion-panel>
              <v-expansion-panel-header class="subtitle-1">
                Custom Field
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-8">
                <v-btn depressed outlined small color="grey darken-3">
                  <span class="caption mr-4"> Add new</span>
                  <v-icon size="16">ri-add-line</v-icon>
                </v-btn>
              </v-expansion-panel-content>
              <v-divider class="mx-6"></v-divider>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";
import Convert from "~/helpers/convert.js";

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
      chat: {
        drawer: true,
        tabs: null,
        rows: [],
        selected: null,
      },
      conversation: {
        key: 0,
        rows: [],
      },
      contactInfo: {
        drawer: false,
        inputGroup: [0],
      },
      form: {
        message: "",
      },
    };
  },
  methods: {
    userClientId() {
      return Convert.stringToHex(this.client.id);
    },
    selectChat(item) {
      this.chat.selected = item;
      this.conversation.rows = item?.conversation || [];
      this.contactInfo.drawer = true;
    },
    onChatMessageIncoming(data) {
      const chats = this.chat.rows;
      const chatId = data.chatId;

      // get chat
      const chat = chats.find((e) => e.chatId === chatId);

      if (typeof chat === "undefined") {
        const chatMessage = {
          chatId: data.chatId,
          clientUserId: data.clientUserId,
          clientUserName: data.clientUserName,
          lastMessage: data.lastMessage,
          updatedAt: data.updatedAt,
          conversation: [data],
        };
        this.chat.rows.unshift(chatMessage);
      } else {
        chat.lastMessage = data.message.body;
        chat.updatedAt = data.updatedAt;
        chat.conversation.push(data);
      }
    },
    async sendMessage() {
      if (this.form.message === "") {
        return;
      }

      const chat = this.chat.selected;
      const clientUserId = chat.clientUserId;

      // conversation message
      const message = {
        body: this.form.message,
        type: "text",
      };
      const from = {
        user: "registered_user",
        refId: this.user.id,
      };
      const conversationMessage = {
        chatId: Date.now() + Math.random().toString().replaceAll(".", ""),
        clientUserId: this.userClientId(),
        clientUserName: "",
        message: {
          ...{
            id: "",
            from: from,
          },
          ...message,
        },
        lastMessage: message.body,
        updatedAt: Date.now(),
        isSending: true,
      };

      this.conversation.rows.push(conversationMessage);
      this.form.message = "";

      // send message
      const item = {
        sendTo: clientUserId,
        from: from,
        message: message,
      };

      const sendMessage = await this.$store.dispatch("chats/sendMessage", {
        key: this.client.sdkKey,
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

      // scroll to bottom
      this.scrolToBottom();
    },
    scrolToBottom() {
      setTimeout(() => {
        const element = document.getElementById("chatContainer");
        element.scrollTop = element.offsetHeight + element.scrollHeight;
      }, 100);
    },
    stringToColor(str) {
      return Convert.stringToColor(str);
    },
  },
  created() {
    this.$nuxt.$on("indexChatIncomingMessage", (data) => {
      this.onChatMessageIncoming(data);
    });
  },
};
</script>

<style lang="scss">
// form input
.v-input {
  .v-label {
    &.v-label--active {
      left: -28px !important;
    }
  }
}

// chat list
.chats {
  .v-tab {
    text-transform: capitalize !important;
    padding: 0 16px;
    border-radius: 32px;
    overflow: hidden;
    background-color: #eee;
    &.v-tab--active {
      background-color: #e2f3ff;
      border: none;
    }
  }
  .v-tabs-items {
    background-color: rgba(255, 255, 255, 0) !important;
  }
}
.theme--dark.v-tabs > .v-tabs-bar {
  background-color: rgba(0, 0, 0, 0) !important;
}

::-webkit-scrollbar {
  width: 0;
}
</style>
