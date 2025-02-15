<template>
  <app-base-layout>
    <template v-if="isIOModuleLoaded">
      <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
        <template v-slot:prepend>
          <v-toolbar flat color="transparent">
            <v-list-item class="pa-0">
              <v-list-item-icon class="mr-2">
                <Logo />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="title primary--text">
                  SimpleChat
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-toolbar>
        </template>
        <v-list class="nav-menu">
          <div v-for="(item, index) in navigationMenu" :key="index">
            <v-expansion-panels v-if="item.children.length > 0" flat accordion>
              <v-expansion-panel>
                <v-expansion-panel-header class="py-0 px-4">
                  <v-list-item class="px-0">
                    <v-list-item-action class="mr-2">
                      <v-icon size="20">{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list-item
                    v-for="(itemChild, i) in item.children"
                    :key="i"
                    :to="itemChild.to"
                    router
                    exact
                  >
                    <v-list-item-action class="mr-2">
                      <v-icon size="16">{{ itemChild.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title class="subtitle-2 font-weight-light">{{
                        itemChild.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-list-item v-else :to="item.to" router exact>
              <v-list-item-action class="mr-2">
                <v-icon size="20">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list>
        <template v-slot:append>
          <v-divider></v-divider>
          <v-menu top offset-y nudge-top="4" content-class="user-menu elevation-0">
            <template v-slot:activator="{ on, attrs }">
              <v-card v-bind="attrs" v-on="on">
                <v-list-item :class="miniVariant ? 'px-2' : ''">
                  <v-list-item-avatar size="32" color="primary" class="mr-4">
                    <v-img
                      v-if="user.image.url !== null"
                      :aspect-ratio="1 / 1"
                      :src="user.image.url"
                    ></v-img>
                    <v-icon v-else size="16" dark> ri-user-3-line </v-icon>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title> {{ user.name }} </v-list-item-title>
                    <v-list-item-subtitle> {{ user.email }} </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </template>
            <v-list>
              <v-list-item @click.stop.prevent>
                <v-list-item-icon class="mr-4">
                  <v-icon size="20">ri-contrast-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Dark mode</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-switch
                    v-model="darkmode"
                    inset
                    dense
                    color="primary"
                    @click="toggleDarkMode"
                  />
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item to="/admin/profile">
                <v-list-item-icon class="mr-4">
                  <v-icon size="20">ri-user-3-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Your profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item to="/admin/profile">
                <v-list-item-icon class="mr-4">
                  <v-icon size="20">ri-wallet-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Billing</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon class="mr-4">
                  <v-icon size="20">ri-logout-circle-line</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-navigation-drawer>
      <v-main>
        <Nuxt />
      </v-main>
    </template>
  </app-base-layout>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      user: "users/user",
    }),
  },
  data() {
    return {
      title: "AdminStarter",
      isIOModuleLoaded: false,
      darkmode: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      navigationMenu: [
        {
          icon: "ri-message-3-line",
          title: "Live chat",
          to: "/admin",
          children: [],
        },
        {
          icon: "ri-contacts-book-3-line",
          title: "Contacts",
          to: "#",
          children: [],
        },
        {
          icon: "ri-filter-3-line",
          title: "Segnents",
          to: "#",
          children: [],
        },
        {
          icon: "ri-space-ship-line",
          title: "Campaign",
          to: "#",
          children: [],
        },
        {
          icon: "ri-inbox-2-line",
          title: "Ticket",
          to: "#",
          children: [],
        },
        {
          icon: "ri-bar-chart-box-line",
          title: "Report",
          to: "#",
          children: [],
        },
        {
          icon: "ri-settings-line",
          title: "Settings",
          to: "#",
          children: [
            {
              icon: "ri-group-2-line",
              title: "Teams",
              to: "#",
            },
            {
              icon: "ri-layout-bottom-line",
              title: "Widget",
              to: "#",
            },
            {
              icon: "ri-layout-masonry-line",
              title: "Integrations",
              to: "#",
            },
          ],
        },
      ],
    };
  },
  methods: {
    async getUser() {
      const getUser = await this.$store.dispatch("users/me");

      if (!getUser.success) {
        // unset user session
        await this.$store.dispatch("users/unsetUserSession");

        // redirect to login page
        this.$router.push({
          path: "/login",
        });
      }
    },
    async logout() {
      // logout user
      await this.$store.dispatch("users/logout");

      // redirect to login page
      this.$router.push({
        path: "/login",
      });
    },
    toggleDarkMode() {
      if (process.browser) {
        if (this.darkmode === true) {
          this.$vuetify.theme.dark = true;
          localStorage.setItem("DarkMode", true);
        } else if (this.darkmode === false) {
          this.$vuetify.theme.dark = false;
          localStorage.setItem("DarkMode", false);
        }
      }
    },
  },
  async mounted() {
    // set theme
    if (process.browser) {
      if (localStorage.getItem("DarkMode")) {
        const cookieValue = localStorage.getItem("DarkMode") === "true";
        this.darkmode = cookieValue;
        this.$vuetify.theme.dark = cookieValue;
      }
    }

    // get user
    await this.getUser();
  },
};
</script>

<style lang="scss">
.user-menu {
  left: 4px !important;
  top: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
}
.theme--dark {
  .user-menu {
    border-color: rgba(255, 255, 255, 0.3);
  }
}
</style>
