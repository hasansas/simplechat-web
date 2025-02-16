<template>
  <v-app>
    <div
      class="grow d-flex flex-column flex-nowrap"
      :style="!isSettingsLoaded ? 'display:none !important;' : ''"
    >
      <slot v-if="isSettingsLoaded" />
    </div>
    <v-card
      v-if="!isSettingsLoaded"
      flat
      class="fill-height d-flex align-center justify-center"
    >
      <v-card flat height="32" width="72">
        <div class="loader"></div>
      </v-card>
    </v-card>
  </v-app>
</template>

<script>
import "~/assets/scss/style.scss";

export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href:
            "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css",
        },
        { rel: "stylesheet", href: "https://cdn.lineicons.com/5.0/lineicons.css" },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
    };
  },
  data() {
    return {
      isSettingsLoaded: false,
    };
  },
  methods: {
    loadSettings() {
      this.isSettingsLoaded = true;
    },
  },
  mounted() {
    this.loadSettings();
  },
};
</script>
