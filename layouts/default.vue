<template>
   <app-mobile-header></app-mobile-header>

   <v-main>
      <slot/>
   </v-main>

   <lazy-app-mobile-action-drawer></lazy-app-mobile-action-drawer>
   <app-mobile-navigation></app-mobile-navigation>
   <lazy-app-dialog></lazy-app-dialog>
</template>