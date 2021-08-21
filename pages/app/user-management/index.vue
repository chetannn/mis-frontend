<template>
  <div class="h-100">
    <v-toolbar flat height="38" class="toolbar-border-bottom">

      <v-spacer />

      <s-btn
        outlined
        tooltip="Reload users"
        color="primary"
        small
        :disabled="false"
        @click.prevent
      >
        <v-icon small left> mdi-reload </v-icon>
        Reload
      </s-btn>

      <s-btn
        outlined
        tooltip="Add new user"
        color="primary"
        small
        :disabled="false"
        @click="userDialog"
        btnClass="ml-2"
      >
        <v-icon small left> mdi-plus </v-icon>
        New
      </s-btn>

      <s-btn tooltip="Export" outlined small color="primary" btnClass="mx-2">
        <v-icon>mdi-printer</v-icon>
      </s-btn>
    </v-toolbar>

    <v-card>
      <v-data-table
        hide-default-header
        :items-per-page="15"
        :items="users"
        :server-items-length="total"
        :loading="loading"
        :page="Number($route.query.pageNumber) || 1"
        @update:page="changePageNumber"

      >
        <template #header>
          <thead>
            <tr class="text-left">
              <th class="font-weight-regular caption">
                <!-- <v-icon small> mdi-drama-masks </v-icon> -->
                Name
              </th>

              <th class="font-weight-regular caption">
                <!-- <v-icon small> mdi-email-outline </v-icon> -->
                Email
              </th>

              <th class="font-weight-regular caption">Actions</th>
            </tr>
          </thead>
        </template>

        <template #item="{ item }">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>

            <td>
              <v-icon
                tooltip="Edit User"
                icon-class=""
                color="primary"
                small
                @click.prevent.stop="
                  selectedUser = item;
                  userEditDialog = true;
                "
              >
                mdi-pencil-outline
              </v-icon>

              <v-icon
                tooltip="Remove user from project"
                class="ml-2"
                color="error"
                small
                @click.prevent.stop="
                  deleteId = item.id;
                  deleteItem = item.id;
                  showConfirmDlg = true;
                "
              >
                mdi-delete-outline
              </v-icon>

              <v-icon
                v-if="item.invite_token"
                tooltip="Resend invite email"
                icon-class="mt-n1"
                color="primary"
                small
                @click.prevent.stop="rensendInvite(item.id)"
              >
                mdi-email-send-outline
              </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  head: {
    title: "User Management",
  },
  data() {
    return {
      dialog: false,
      form: this.$vform({
        name: "",
        email: "",
        password: "",
      }),
      
    };
  },
  watch: {

  },
  computed: {
    ...mapState({
      users: (state) => state.users.list,
      modelData: state => state.users.modelData,
      total: state => state.users.total,
      loading: state => state.users.loading
    }),
  },
  async created() {
    this.$store.dispatch("users/getAll");
  },
  methods: {
    ...mapActions({
        store: 'users/store'
    }),

    addUser() {
      this.store().then(res => {
          this.$store.dispatch('setSnackbar', {
            text: 'User Created Successfully'
          })

          this.dialog = false
      })
      
    },
    changePageNumber(newPageNumber) {
      this.$router.push({path: this.$route.path, query: { pageNumber: newPageNumber}})

    }
  },
  layout: "app",
};
</script>

<style>
</style>