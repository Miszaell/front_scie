import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    token: null,
    isAuthenticated: false,
  }),
  getters: {
    getUserName: (state) => state.user.name,
    getMe: (state) => state.user,
    getToken: (state) => state.token,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
  actions: {

    async doLogin(payload) {
      await api.post('login/', payload).then(response => {
        const token = response.data.token
        const user = response.data.user
        this.setToken(token)
        this.getUser(user)
      })
    },

    signOut() {
      api.defaults.headers.common.Authorization = ''
      this.removeToken()
    },

    getUser(user) {
      this.user = user
      if (typeof user == "object") {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.setItem('user', user)
      }

    },

    async init() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token) {
        this.setToken(token)
        api.defaults.headers.common.Authorization = 'Token ' + token
        this.getUser(JSON.parse(user))
      } else {
        this.removeToken()
      }
    },

    setToken(token) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
      api.defaults.headers.common.Authorization = 'Token ' + token
    },

    removeToken() {
      this.token = ''
      this.isAuthenticated = false
      localStorage.clear()
    }
  },
});
