<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <q-btn color="primary" icon="check" label="OKs" @click="btnClick" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
export default defineComponent({
  name: "IndexPage",
  methods: {
    btnClick() {
      Notify.create({ message: "done", icon: "announcement", type: "positive" });
    },
  },
});
</script>
