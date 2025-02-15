<template>
  <diV class="fill-height overflow-hidden">
    <v-navigation-drawer
      :value="true"
      stateless
      floating
      app
      width="100%"
      class="chat-screen grow elevation-0 overflow-hidden"
    >
      <template v-slot:append>
        <v-card flat color="transparent" class="pa-4">
          <v-card flat outlined class="d-flex align-center pa-2 rounded-xxl">
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
        <!-- <template v-for="(item, index) in chat.selected.conversation">
          <v-list-item :key="index">
            <div class="message" :class="item.isMe ? 'sent ml-auto' : 'received'">
              <div class="text">
                <span>{{ item.message.body }}</span>
              </div>
            </div>
          </v-list-item>
          <v-spacer :key="`d-${index}`" class="mb-3"></v-spacer>
        </template> -->
      </v-list>
    </v-navigation-drawer>
  </diV>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
}
</style>
