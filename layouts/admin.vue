<template>
  <app-base-layout>
    <template v-if="isIOModuleLoaded">
      <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app>
        <template v-slot:prepend>
          <v-list-item>
            <v-list-item-icon class="mr-2">
              <NuxtLogo />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="headline"> AdmStarter </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-list class="nav-menu">
          <v-list-item
            v-for="(item, i) in navigationMenu"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action class="mr-2">
              <v-icon size="20">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-divider></v-divider>
          <v-menu top offset-y nudge-top="4" content-class="user-menu elevation-0">
            <template v-slot:activator="{ on, attrs }">
              <v-card v-bind="attrs" v-on="on">
                <v-list-item :class="miniVariant ? 'px-2' : ''">
                  <v-list-item-avatar color="primary" class="mr-4">
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
                  <v-list-item-title>Profile settings</v-list-item-title>
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
      <v-app-bar fixed flat app :color="!$vuetify.theme.dark ? 'white' : ''">
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>
            {{ miniVariant ? "ri-menu-3-line" : "ri-menu-2-line" }}
          </v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </v-app-bar>
      <v-main>
        <v-container>
          <Nuxt />
        </v-container>
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
      title: "WA Web Blast",
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
          icon: "ri-dashboard-line",
          title: "Dashboard",
          to: "/admin",
        },
        {
          icon: "ri-newspaper-line",
          title: "Blog",
          to: "/blog",
        },
        {
          icon: "ri-calendar-line",
          title: "Events",
          to: "/event",
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
