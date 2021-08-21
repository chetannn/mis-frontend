<template>
    <div>
  <h2>Student List</h2>
    <v-btn @click="dialog = true" color="primary">Create</v-btn>

     <v-dialog scrollable v-model="dialog">
         <v-card>
            <v-card-title class="primary white--text text-h5">Student Entry</v-card-title>

            <v-card-text>
                <v-row>
                    <v-col>
                    <v-text-field label="Roll" />
                    <v-text-field label="First Name" />
                    <v-text-field label="Middle Name" />
                    <v-text-field label="Last Name" />

                    <v-text-field label="First Name NP" />
                    <v-text-field label="Middle Name NP" />
                    <v-text-field label="Last Name NP" />

                    <v-text-field label="DOB (BS)" />
                    <v-text-field label="DOB (AD)" />

                    <v-text-field label="Gender" />
                     <v-text-field label="Blood Group" />
                     <v-text-field label="Email" />
                     <v-text-field label="Mobile" />

                     <v-text-field @click:append="onTreeGridOpenButtonClick" append-icon="mdi-family-tree" label="Address" />
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn color="primary">Save</v-btn>
            </v-card-actions>
         </v-card>
     </v-dialog>

     <v-dialog persistent scrollable max-width="400" v-model="treeDialog">
         <v-card>
             <v-card-title class="primary white--text text-h5">Choose Location</v-card-title>
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

        <v-card-text>
            <v-treeview item-text="name_en" :items="locations" />
        </v-card-text>
         </v-card>
     </v-dialog>
    </div>
</template>

<script>
export default {
    layout: 'app',
    data() {
        return {
            dialog: false,
            locations: [],
            treeDialog: false
        }
    },
    methods: {
        onTreeGridOpenButtonClick() {
            this.treeDialog = true
        }
    },
    created() {
         this.$axios.get('/api/federal')
         .then(res => {
             this.locations = res.data
         })
    }
}
</script>

<style>

</style>