<template>
  <q-item
    :class="!$q.dark.isActive ? 'bg-light text-dark' : 'bg-dark text-light'"
    clickable
    tag="a"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" class="text-accent" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-info">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    icon: {
      type: String,
      default: "",
    },
  },
});
</script>
