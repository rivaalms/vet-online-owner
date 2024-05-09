<template>
   <v-app>
      <nuxt-layout>
         <nuxt-page></nuxt-page>
      </nuxt-layout>

      <v-snackbar
         v-model="snackbar.show"
         :color="snackbar.color"
         location="top"
      >
         {{ snackbar.text }}

         <template #actions>
            <v-btn
               icon="mdi-close"
               color="white"
               @click.stop="snackbar.show = false"
            />
         </template>
      </v-snackbar>
   </v-app>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'

useHead({
   titleTemplate: (title) => title ? `${title} - Vet Online` : 'Vet Online'
})

const { getUser: user } = useAuthStore()
const socketUrl = useRuntimeConfig().public.socketServerUrl
const { snackbar, resetSnackbar } = useAppStore()
const socket = io(socketUrl)

onBeforeMount(() => {
   socket.on('connect', () => {
      console.info('Connected to socket server')
      socket.emit('ping', { id: user?.id, name: user?.name })
   })

   window.onbeforeunload = async () => {
      await new Promise((resolve) => {
         socket.emit('unregister', { id: user?.id, name: user?.name })
         resolve(true)
      })
   }
})

watch(() => snackbar.show, (val) => {
   if (!val) {
      snackbar.color = ''
      snackbar.text = ''
   }
})
</script>