<template>
  <q-page padding>
    <GenericTable
      v-if="getterData.length > 0"
      ref="child"
      :table-title="'Usuarios'"
      :form-config="formConfig"
      :title-export="'users'"
      :getter-data="getterData"
      :delete-keys="deleteKeys"
      :api-route="'users/'"
      :front-route="'/config/usuarios'"
      v-on:sync:data="getData($event)"
      v-on:send:put="putRecord($event)"
      v-on:send:post="postRecord($event)"
      v-on:send:del="deleteRecord($event)"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import GenericTable from "src/components/custom/GenericTable.vue";

import { useUserStore } from "src/stores/user/userStore";
export default defineComponent({
  name: "UsuariosPage",
  components: {
    GenericTable,
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore,
    };
  },
  data: function () {
    return {
      data: [],
      getterData: [],
      deleteKeys: ["password"],
      formConfig: [
        {
          element: "name",
          type: "text",
          required: true,
          label: "Nombre",
        },
        {
          element: "last_name",
          type: "text",
          required: false,
        },
        {
          element: "username",
          type: "text",
          required: true,
        },
        {
          element: "password",
          label: "Password",
          type: "text",
          required: false,
          skipList: true,
        },
        {
          element: "email",
          type: "text",
          required: false,
        },
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        await this.userStore.fetchUsers();
        this.getterData = this.userStore.getUsers;
      } catch (err) {
        console.log(err);
        if (err.response.data.error) {
          $q.notify({
            type: "negative",
            message: err.response.data.error,
          });
        }
      }
    },
    async putRecord(ev) {
      console.log(ev);
      try {
        await this.userStore.putUser(ev.rows.id, ev.formData);
        await this.getData();
      } catch (error) {
        console.error(error);
      }
    },
    async postRecord(ev) {
      try {
        await this.userStore.postUser(ev);
        this.$refs.child.cancel();
        await this.getData();
      } catch (error) {
        if (error.response.data.errors) {
          let msg = error.response.data.errors;
          let keys = Object.keys(msg);
          console.log(keys);
          for (let index = 0; index < keys.length; index++) {
            this.$q.notify({
              type: "negative",
              position: "bottom",
              message: `${keys[index].toUpperCase()}: ${msg[keys[index]]}`,
            });
          }
        }
      }
    },
    async deleteRecord(ev) {
      try {
        await this.userStore.deleteUser(ev);
        this.$refs.child.cancel();
        this.getData();
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>
