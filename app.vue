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
useHead({
   titleTemplate: (title) => title ? `${title} - Vet Online` : 'Vet Online'
})

const { snackbar, resetSnackbar } = useAppStore()

watch(() => snackbar.show, (val) => {
   if (!val) {
      snackbar.color = ''
      snackbar.text = ''
   }
})
</script>