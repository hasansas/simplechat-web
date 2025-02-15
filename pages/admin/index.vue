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
                :color="stringToColor(item.user.id)"
                class="mr-4"
              >
                <v-icon size="16" dark> ri-user-3-line </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title> {{ item.user.name }} </v-list-item-title>
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
      class="grow d-flex align-center justify-center"
    >
      <div class="text-center">
        <div class="logo-x-large logo-disable">
          <Logo />
        </div>
        <div class="my-8">Please select a chat conversation</div>
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
        <v-toolbar flat color="white">
          <v-list-item class="pa-0">
            <v-list-item-avatar size="48" color="pink lighten-3" class="mr-4">
              <v-icon size="16" dark> ri-user-3-line </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ chat.selected.user.name }}
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
          <v-card flat outlined class="d-flex align-center pa-2 rounded-xxl">
            <v-btn icon>
              <v-icon>ri-attachment-2</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>ri-user-smile-line</v-icon>
            </v-btn>
            <v-text-field hide-details rounded dense class="pa-0 ma-0"></v-text-field>
            <v-btn depressed icon small type="submit" color="white" class="mr-2">
              <v-icon color="grey darken-1">ri-send-plane-2-line</v-icon>
            </v-btn>
          </v-card>
        </v-card>
      </template>
      <v-list color="transparent" class="messages-container">
        <template v-for="(item, index) in chat.selected.conversation">
          <v-list-item :key="index">
            <div class="message" :class="item.isMe ? 'sent ml-auto' : 'received'">
              <div class="text">
                <span>{{ item.message.body }}</span>
              </div>
            </div>
          </v-list-item>
          <v-spacer :key="`d-${index}`" class="mb-3"></v-spacer>
        </template>
      </v-list>
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
        <v-toolbar outlined flat color="white" style="margin-left: 1px">
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
      <v-card flat class="text-center mt-16">
        <v-list-item-avatar size="160" color="blue lighten-3" class="mr-4">
          <v-icon size="32" dark> ri-user-3-line </v-icon>
        </v-list-item-avatar>
        <v-card-title class="headline d-block">
          {{ chat.selected.user.name }}
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

        <!-- <div class="mt-8">
          <v-btn depressed color="primary">Add to contact</v-btn>
        </div> -->
      </v-card>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
import Convert from "~/helpers/convert.js";

export default {
  layout: "admin",
  data() {
    return {
      chat: {
        drawer: true,
        tabs: null,
        rows: [
          {
            id: "a2e2b218-136a-4241-aeea-2048bdfca5b7",
            user: {
              id: "a2e2b218-136a-4241-aeea-2048bdfca5b7",
              name: "John Pixel",
            },
            status: "online",
            lastMessage:
              "Morbi hendrerit augue eget tortor sagittis, sed fringilla ligula molestie",
            updatedAt: "2025-02-15T03:37:57.426Z",
            conversation: [],
          },
          {
            id: "0153b78d-f5c1-42a2-9ffb-aa54a04193b4",
            user: {
              id: "0153b78d-f5c1-42a2-9ffb-aa54a04193b4",
              name: "Baba Yaga",
            },
            status: "online",
            lastMessage: "Suspendisse aliquam semper",
            updatedAt: "2024-11-04T03:41:35.194Z",
            conversation: [],
          },
          {
            id: "f7059c4e-b2a1-42eb-ac6f-3da9448e13f4",
            user: {
              id: "f7059c4e-b2a1-42eb-ac6f-3da9448e13f4",
              name: "Baba Yaga",
            },
            status: "offline",
            lastMessage:
              "Pellentesque imperdiet sem mauris, sit amet euismod sapien egestas eget",
            updatedAt: "2024-11-11T08:07:15.715Z",
            conversation: [],
          },
        ],
        selected: {
          id: "f7059c4e-b2a1-42eb-ac6f-3da9448e13f4",
          user: {
            id: "f7059c4e-b2a1-42eb-ac6f-3da9448e13f4",
            name: "Baba Yaga",
          },
          status: "offline",
          lastMessage:
            "Pellentesque imperdiet sem mauris, sit amet euismod sapien egestas eget",
          updatedAt: "2024-11-11T08:07:15.715Z",
          conversation: [],
        },
      },
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
      ],
      contactInfo: {
        drawer: true,
        inputGroup: [0],
      },
    };
  },
  methods: {
    selectChat(item) {
      this.chat.selected = item;
      this.contactInfo.drawer = true;
    },
    onChatMessageIncoming(data) {
      const chats = this.chat.rows;
      const chatId = data.chatId;
      const message = data.message;
      const conversation = {
        id: "75c065cb-2b05-4ff9-bab7-30ef94a7c0ae",
        message: message,
        isMe: false,
        createdAt: "2025-01-04T05:25:20.633Z",
      };

      // get chat
      const chat = chats.find((e) => e.id === chatId);

      if (typeof chat === "undefined") {
        const newChat = {
          id: chatId,
          user: {
            id: data.user.refId,
            name: data.user.name,
          },
          status: "online",
          lastMessage: message.body,
          updatedAt: message.createdAt,
          conversation: [conversation],
        };

        this.chat.rows.unshift(newChat);
      } else {
        chat.lastMessage = message.body;
        chat.updatedAt = message.createdAt;
        chat.conversation.push(conversation);
      }
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

// Chat screen
.chat-screen {
  // background-color: #f3ede7 !important;
  background-color: rgba(0, 0, 0, 0.03) !important;

  .messages-container {
    overflow-y: scroll;

    .v-list-item {
      min-height: auto;

      .message {
        margin-top: 2px;
        background-color: white;
        border-radius: 0px 8px 8px 8px;
        display: block;
        line-height: 1;
        min-height: auto;
        padding: 4px;
        max-width: 80%;
        filter: drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.1));

        .image-container {
          position: relative;

          .btn-action {
            position: absolute;
            top: 12px;
            right: 12px;
            z-index: 5;
            opacity: 0;
          }

          &:hover {
            .btn-action {
              opacity: 1;
            }
          }
        }

        .text {
          overflow: hidden;
          display: inline-block;
          font-size: 16px;
          line-height: 1.25;
          margin: 8px;
          white-space: pre-line;
          width: 100%;
          padding-right: 12px;

          ul {
            list-style: none;
          }

          p {
            margin: 0;
          }
        }

        img {
          max-width: 100%;
        }

        .text {
          white-space: pre-line;
        }

        .document {
          overflow: hidden;
          line-break: anywhere;
          background: #f5f6f6;
          padding: 8px;
        }

        &:after {
          position: absolute;
          content: "";
          width: 0;
          height: 0;
          border-style: solid;
        }

        // top arrow shape for received component:
        &.received:after {
          border-width: 0px 10px 10px 0;
          border-color: transparent #fff transparent transparent;
          top: 0;
          left: -10px;
        }

        // top arrow shape for sent component:

        &.sent {
          background-color: #e2f3ff;
          border-radius: 8px 0px 8px 8px;

          &:after {
            border-width: 0px 0 10px 10px;
            border-color: transparent transparent transparent #e2f3ff;
            top: 0;
            right: -10px;
          }
        }
      }
    }
  }

  .messages-actions {
    height: 64px;
  }
}
</style>
