<template>
   <app-mobile-header></app-mobile-header>

   <v-main>
      <slot/>
   </v-main>

   <app-mobile-navigation
      v-if="!consultationStore.isInConsultation"
   ></app-mobile-navigation>
   <lazy-app-mobile-action-drawer
      v-if="!consultationStore.isInConsultation"
   ></lazy-app-mobile-action-drawer>
   <lazy-app-dialog></lazy-app-dialog>
</template>

<script setup lang="ts">
const consultationStore = useConsultationStore()
</script>