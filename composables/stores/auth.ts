import { defineStore } from 'pinia'
import { login as $login, logout as $logout } from '@/utils/api/auth'

type State = {
   user: Model.User | null
   token: string | null
}

export const useAuthStore = defineStore('vet-online-owner-auth', {
   persist: true,

   state: () : State => ({
      user: null,
      token: null
   }),

   getters: {
      getUser: (state) => state.user,
      getToken: (state) => state.token,
      isLoggedIn: (state) => !!state.token
   },

   actions: {
      async login(payload: API.Request.Form.Login) {
         await $login(payload)
            .then(resp => {
               this.user = resp.user
               this.token = resp.token
               useAppStore().notify('Login berhasil', 'success')
            })
      },

      async logout() {
         await $logout()
            .then(() => {
               this.$reset()
            })
      }
   }
})