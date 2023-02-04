import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    usersList: {},
    user: {},
  }),
  getters: {
    getUsers: (state) => state.usersList,
  },
  actions: {
    async fetchUsers() {
      await api.get('users/').then(response => {
        const usersList = response.data
        this.usersList = usersList
        let a = 0
      })
    },
    async postUser(payload) {
      await api.post('users/', payload).then(response => {
        const usersList = response.data
        this.usersList = usersList
      })
    },
    async putUser(id, payload) {
      await api.put(`users/${id}/`, payload).then(response => {
        const usersList = response.data
        this.usersList = usersList
      })
    },
    async deleteUser(id) {
      await api.delete(`users/${id}/`).then(response => {
        const usersList = response.data
        this.usersList = usersList
      })
    },
  }
});
