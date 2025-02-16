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
        <template v-for="(item, index) in conversation">
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
  </diV>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },
  methods: {},
  created() {
    // ...
  },
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0;
}
</style>
