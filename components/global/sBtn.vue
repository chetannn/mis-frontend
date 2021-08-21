<template>
  <v-tooltip v-if="tooltip || $slots['tooltip']" v-bind="tooltipProp">
    <template #activator="{ on }">
      <v-btn
        :class="[btnClass, $attrs['btn.class']]"
        v-bind="$attrs"
        v-on="{ ...$listeners, ...on }"
      >
        <v-icon v-if="icon" small>
          {{ icon }} </v-icon
        >&nbsp;
        <slot />
      </v-btn>
    </template>
    <slot name="tooltip">
      <span>{{ tooltip }}</span>
    </slot>
  </v-tooltip>
  <v-btn
    v-else
    ref="btn"
    v-bind="$attrs"
    :class="[btnClass, $attrs['btn.class']]"
    v-on="$listeners"
  >
    <v-icon v-if="icon">
      {{ icon }}
    </v-icon>
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    tooltipProp: {
      type: Object,
      default: () => ({
        bottom: true,
      }),
    },
    btnClass: [Object, String, Array],
    tooltip: String,
    icon: String
  },
};
</script>

<style>
</style>