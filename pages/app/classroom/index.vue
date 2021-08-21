<template>
<div>

   <v-toolbar flat height="38" class="toolbar-border-bottom">
                <v-text-field
        v-model="query"
        style="max-width: 300px"
        dense
        solo
        flat
        class="search-field caption"
        hide-details
        placeholder="Filter by email"
        @keypress.enter="loadUsers"
      >

      <template #prepend-inner>
          <v-icon class="mt-1" small>
            mdi-magnify
          </v-icon>
        </template>

                </v-text-field>

                <v-spacer />

      <s-btn
        outlined
        tooltip="Reload users"
        color="primary"
        small
        :disabled="false"
        @click.prevent
      >
        <v-icon small left>
          mdi-reload
        </v-icon>
        Reload
      </s-btn>

      <s-btn
        outlined
        tooltip="Add new user"
        color="primary"
        small
        :disabled="false"
        @click="dialog = true"
        btnClass="ml-2"
      >
        <v-icon small left>
          mdi-plus
        </v-icon>
        New
      </s-btn>

      <s-btn tooltip="Export"
                outlined
                small
                color="primary"
                btnClass="mx-2"
                >

                <v-icon>mdi-printer</v-icon>
      </s-btn>

        </v-toolbar>
<v-row>
  <v-col cols="3">
<v-card max-width="400">
  <v-card-title class="primary white--text text-h5">Class Hierarchy</v-card-title>
  <v-sheet class="pa-4 primary">
      <v-text-field
        v-model="search"
        label="Search"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
<v-treeview
        v-model="tree"
        selectable
        selection-type="independent"
        :items="items"
        @input="onTreeItemSelected"
        return-object
          activatable
        hoverable
        :search="search">

 </v-treeview>
</v-card>
  </v-col>

  <v-col cols="9">
    <v-card>
         <v-data-table @click:row="onParentClick" :items="users" :headers="headers"></v-data-table>
    </v-card>

    <v-card class="mt-4">
         <v-data-table  :items="sub_list" :headers="headers"></v-data-table>
    </v-card>
  </v-col>
</v-row>


<v-dialog v-model="dialog">
  <v-card>

      <v-card-title>
          Add Class
      </v-card-title>

      <v-card-text>
        <v-text-field v-model="form.name" label="Name" />
      </v-card-text>
     <v-card-actions>
       <v-spacer />
       <v-btn @click="save">Save</v-btn>
     </v-card-actions>
  </v-card>
</v-dialog>

</div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      search: '',
      headers: [{
        text: 'Name',
        value: 'name'
      }, {
        text: 'Level Type',
        value: 'email'
      }],
      users: [],
      tree: [],
      dialog: false,
      form: this.$vform({
        name: '',
        parent_id: null
      }),
      sub_list: []
    }
  },
  created() {
    this.$axios.get('/api/class')
    .then(res => {
      this.items = res.data
    })

    this.$axios.get('/api/v1/users')
    .then(res => {
      this.users = res.data
    })
  },
  methods: {
      onTreeItemSelected(selectedItems) {
          if(selectedItems.length > 0) {

                this.form.parent_id = selectedItems[0].id

                this.$axios.get(`/api/class/${selectedItems[0].id}`)
                .then(res => {
                   this.users = res.data
                })
          }
      },
      save() {
          this.form.post('/api/class')
              .then(res => {
                console.log(res)
                this.dialog = false
              })
      },
      onParentClick(row) {
          this.$axios.get(`/api/class/${row.id}`)
                .then(res => {
                   this.sub_list = res.data
                })
      }
  },
  layout: 'app'
}
</script>

<style>

</style>