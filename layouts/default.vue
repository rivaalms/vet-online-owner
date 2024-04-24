<template>
   <v-app-bar scroll-behavior="hide" scroll-threshold="256" title="Vet Online"></v-app-bar>

   <v-main>
      <slot/>
   </v-main>

   <app-mobile-navigation></app-mobile-navigation>
</template>