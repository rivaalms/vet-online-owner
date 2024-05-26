<template>
   <app-mobile-header></app-mobile-header>

   <v-main>
      <slot/>
   </v-main>

   <app-mobile-navigation></app-mobile-navigation>
   <lazy-app-mobile-action-drawer></lazy-app-mobile-action-drawer>
   <lazy-app-dialog></lazy-app-dialog>
</template>