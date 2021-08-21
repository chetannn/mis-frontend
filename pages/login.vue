<template>
  <div>
      <a v-if="!$auth.loggedIn" @click="login" href="#">Login</a>
       <div v-else>
      <h2>{{ $auth.user.name }}</h2>
       <a href="#" @click="logout">Logout</a>
       </div>

       <v-card v-if="!$auth.loggedIn">
           <v-card-title>Login</v-card-title>

           <v-card-text>
               <v-text-field v-model="form.email" :error-messages="form.errors.get('email')" label="Email" />
               <v-text-field v-model="form.password" label="Password" />
           </v-card-text>

           <v-card-actions>
               <v-spacer />
               <v-btn @click="login" color="primary">Login</v-btn>
           </v-card-actions>
       </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            form: this.$vform({
                email: '',
                password: ''
            })
        }
    },
    methods: {
        login() {
            this.$auth.loginWith('laravelSanctum', {
                data: {
                    email: this.form.email,
                    password: this.form.password
                }
            })
        },
        logout() {
            this.$auth.logout()
            .then(res => location.reload())
        }
    }
}
</script>

<style>

</style>