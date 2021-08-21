<template>
    <v-app-bar
      fixed
      app
      color="primary"
      dark
    >
      
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <s-btn @click="logout" text tooltip="Logout">
          <v-icon>mdi-power</v-icon>
      </s-btn>
      
    </v-app-bar>
</template>

<script>
export default {
    name: 'app-header',
    props: {
        title: String
    },
    methods: {
         logout() {
            this.$auth.logout()
            .then(res => this.$router.replace('/'))
        }
    }
}
</script>

<style>

</style>