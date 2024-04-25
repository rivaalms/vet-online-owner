<template>
   <v-app-bar title="Vet Online"></v-app-bar>

   <v-main>
      <slot/>
   </v-main>

   <lazy-app-mobile-action-drawer></lazy-app-mobile-action-drawer>
   <app-mobile-navigation></app-mobile-navigation>
</template>