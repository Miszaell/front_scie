<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth/authStore";
import { api } from "src/boot/axios";

export default defineComponent({
  name: "App",

  setup() {
    const authStore = useAuthStore();
    authStore.init();
    const token = authStore.getToken;
    if (token.length > 0) {
      api.defaults.headers.common.Authorization = "Token " + token;
    } else {
      api.defaults.headers.common.Authorization = "";
    }
  },
  // created() {
  //   this.$q.dark.set(true);
  // },
});
</script>
