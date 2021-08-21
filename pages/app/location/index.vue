<template>
    <v-treeview item-text="name_np" :items="locations" />
</template>

<script>
export default {
    data() {
        return {
            locations: []
        }
    },
    created() {
        this.$axios.get('/api/federal')
         .then(res => {
             this.locations = res.data
         })
    },
    layout: 'app'
}
</script>

<style>

</style>