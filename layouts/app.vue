<template>
  <v-app dark>
    <app-navigation-drawer :navigationItems="menus" />

    <app-header :title="title" />

    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-snackbar
      :timeout="snackbar.timeout"
      :value="snackbar.showing"
      :color="snackbar.color"
    >
      {{ snackbar.text }}

      <v-btn text @click="snackbar.showing = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      title: "Spell MIS",
    };
  },
  computed: {
    ...mapState(["snackbar", "menus"]),
  },
  mounted() {
     this.$store.dispatch('setMenus')
  }
};
</script>
