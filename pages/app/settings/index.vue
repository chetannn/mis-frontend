<template>
  <div>
      <v-autocomplete item-text="name" item-value="id" :items="product_types" label="Product Type" />
      <v-card>
      <v-data-table hide-default-header :items="items">
          <template #header>
            <thead>
                 <tr class="text-left">
                     <th class="font-weight-regular caption">Setting Name</th>
                      <th class="font-weight-regular caption">Value</th>
                      <th class="font-weight-regular caption">Actions</th>
                 </tr>
              
            </thead>


          </template>

          <template #item="{item}">
            <tr>
                <td>
                    {{ item.name }}
                </td>
                <td>
                    <v-text-field v-if="item.type === 'text'" :type="item.type" />
                    <v-autocomplete :item-text="item.combo_text" :item-value="item.combo_value" :items="item.items" @click="onComboClick(item)" v-else-if="item.type === 'combo' " />
                    <v-text-field v-else-if="item.type === 'tree' " append-icon="mdi-family-tree" />
                </td>

                <td>
                    <v-btn small color="primary">Save</v-btn>
                </td>
            </tr>
          </template>
      </v-data-table>
      </v-card>
  </div>
</template>

<script>
export default {
    layout: 'app',
    data() {
        return {
            items: [
             { name: 'School Name', type: 'text' },
             { name: 'School Address', type: 'text' },
             { name: 'Email', type: 'text' },
             { name: 'Telephone', type: 'text' },
             { name: 'Fiscal Year', type: 'combo', combo_text: 'name', combo_value: 'id', url: 'http://localhost:8000/api/v1/users', items: [] }, 
             { name: 'Academic Year', type: 'combo', combo_text: 'name', combo_value: 'id', url: 'http://localhost:8000/api/v1/users', items: [] },
             { name: 'Address', type: 'tree' }
             ],
             product_types: [{ id: 1, name: 'General' }, { id: 2, name: 'Fee' }, { id: 3, name: 'Class' }, { id: 4, name: 'Exam' } ]
        }
    },
    methods: {
        onComboClick(item) {
           this.$axios.get(item.url)
            .then(res => {
                item.items = res.data
            })
        }
    }
}
</script>

<style>

</style>