<template>
  <v-navigation-drawer permanent app dark color="black" expand-on-hover>
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="http://muntax.shangrilagroup.com.np/nepal-logo.png"></v-img>
      </v-list-item-avatar>

      <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>

      <v-btn icon>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-group
        v-for="(parent, parentKey) in navigationItems"
        :key="parentKey"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="parent.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-if="parent.items"
          v-for="(item, i) in parent.items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>

        <v-divider v-else />
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "app-navigation-drawer",

  props: {
    navigationItems: Array,
  },
};
</script>

<style>
</style>