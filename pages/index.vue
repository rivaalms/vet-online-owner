<template>
   <v-container>
      <v-card
         color="primary"
      >
         <v-card-text class="font-weight-semibold text-h6">
            Selamat datang, <br>
            {{ authStore.getUser?.name }}
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
</script>