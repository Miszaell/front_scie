<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      :class="$q.dark.isActive ? 'bg-dark text-light' : 'bg-light text-dark'"
      height-hint="98"
      bordered
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          :class="$q.dark.isActive ? 'text-accent' : 'text-dark'"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <q-img src="~/assets/icon.png" />
          </q-avatar>
          {{ $t("main.appTitle") }}
        </q-toolbar-title>
        <div class="q-px-md">
          <q-icon name="translate" size="25px" class="q-mx-md" @click="setLanguaje()" />
          <q-icon
            v-if="$q.dark.isActive"
            name="brightness_5"
            size="25px"
            @click="$q.dark.toggle"
          />
          <q-icon
            tag="theme"
            v-else
            name="brightness_2"
            size="25px"
            @click="$q.dark.toggle"
          />
        </div>
      </q-toolbar>
      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'"
    >
      <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import EssentialLink from "src/components/EssentialLink.vue";
const linksList = [
  {
    title: "Docs",
    caption: "scie.dev",
    icon: "school",
  },
  {
    title: "Github",
    caption: "github.com/scie",
    icon: "code",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.scie.dev",
    icon: "chat",
  },
  {
    title: "Forum",
    caption: "forum.scie.dev",
    icon: "record_voice_over",
  },
  {
    title: "Twitter",
    caption: "@scie",
    icon: "rss_feed",
  },
  {
    title: "Facebook",
    caption: "@Scie",
    icon: "public",
  },
];
export default {
  components: {
    EssentialLink,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  methods: {
    setLanguaje() {
      let lang = this.$root.$i18n.locale == "en-US" ? "es-MX" : "en-US";
      this.$root.$i18n.locale = lang;
    },
  },
};
</script>
