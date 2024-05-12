import { io } from 'socket.io-client'
import { defineStore } from 'pinia'

export const useSocketStore = defineStore('vet-online-owner-socket', {
   state: () => ({
      socket: io(useRuntimeConfig().public.socketServerUrl, {
         autoConnect: false,
         reconnectionDelay: 5000,
         reconnectionAttempts: 10
      }),
   }),

   getters: {
      isConnected: (state) => state.socket.connected
   },

   actions: {
      register() {
         this.socket.connect()
      },

      unregister() {
         const { getUser: user } = useAuthStore()
         const credentials = {
            id: user?.id,
            name: user?.name,
            type: user?.ref_type
         }

         this.socket.emit('unregister', credentials)
      },

      ping() {
         const { getUser: user } = useAuthStore()
         const credentials = {
            id: user?.id,
            name: user?.name,
            type: user?.ref_type
         }

         this.socket.emit('ping', credentials)
      },

      sendNotification(id: string, data: Wildcard) {
         const payload = { id, data }
         this.socket.emit('notification', payload)
      }
   }
})