<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent" height-hint="98">
      <q-toolbar>
        <q-space />
        <div class="q-px-md">
          <q-icon
            name="translate"
            size="25px"
            :class="$q.dark.isActive ? 'text-primary q-mx-md' : 'text-dark q-mx-md'"
            @click="setLanguaje()"
          />
          <q-icon
            v-if="$q.dark.isActive"
            name="brightness_5"
            size="25px"
            @click="$q.dark.toggle"
          />
          <q-icon
            class="text-dark"
            v-else
            name="brightness_2"
            size="25px"
            @click="$q.dark.toggle"
          />
        </div>
      </q-toolbar>
    </q-header>
    <img src="~assets/layered-wave.png" class="wave" alt="login-wave" />
    <div class="row" style="height: 90vh">
      <div class="col-0 col-md-6 flex justify-center content-center">
        <img
          src="~assets/arranging.svg"
          style="max-height: 90%"
          class="responsive"
          alt="login-image"
        />
      </div>
      <div
        v-bind:class="{ 'justify-center': $q.screen.md || $q.screen.sm || $q.screen.xs }"
        class="col-12 col-md-6 flex content-center"
      >
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '50%' }"
          :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
        >
          <q-card-section>
            <q-avatar size="120px" class="absolute-center">
              <img src="~assets/avatar.svg" alt="avatar" style="max-width: 75%" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="q-pt-lg">
              <div class="col text-h6 ellipsis flex justify-center">
                <h2 class="text-h4 q-my-none text-weight-regular">
                  {{ $t("main.login") }}
                </h2>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-gutter-md" @submit.prevent="submitForm">
              <q-input :label="$t('loginForm.user')" v-model="login.username" />
              <q-input
                :label="$t('loginForm.password')"
                type="password"
                v-model="login.password"
              />
              <div>
                <q-btn
                  class="full-width"
                  color="accent"
                  label="Login"
                  type="submit"
                  rounded
                ></q-btn>
                <div class="text-center q-mt-sm q-gutter-lg">
                  <router-link class="text-accent" to="/login">{{
                    $t("loginForm.forgot")
                  }}</router-link>
                </div>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";

let $q;

export default {
  name: "LoginPage",
  data() {
    return {
      login: {
        username: "Admin",
        password: "admin123",
      },
    };
  },
  mounted() {
    $q = useQuasar();
  },
  methods: {
    setLanguaje() {
      let lang = this.$root.$i18n.locale == "en-US" ? "es-MX" : "en-US";
      this.$root.$i18n.locale = lang;
    },
    async submitForm() {
      if (!this.login.username || !this.login.password) {
        $q.notify({
          type: "negative",
          message: "Credenciales insuficientes",
        });
      } else if (this.login.password.length < 6) {
        $q.notify({
          type: "negative",
          message: "La contraseña debe tener más de 6 carácteres",
        });
      } else {
        // try {
        //   await this.doLogin(this.login);
        const toPath = this.$route.query.to || "/home";
        this.$router.push(toPath);
        // } catch (err) {
        //   if (err.response.data.detail) {
        //     $q.notify({
        //       type: "negative",
        //       message: err.response.data.detail,
        //     });
        //   }
        // }
      }
    },
  },
};
</script>

<style scoped>
.wave {
  position: fixed;
  height: 100%;
  left: 0;
  bottom: 0;
  z-index: -1;
}
</style>
