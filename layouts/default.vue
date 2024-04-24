<template>
   <v-app-bar scroll-behavior="hide" scroll-threshold="256" title="Vet Online"></v-app-bar>

   <v-main>
      <slot/>
   </v-main>

   <v-bottom-navigation
      tag="footer"
      class="w-100"
      color="primary"
      :elevation="24"
      grow
   >
      <v-btn>
         <v-icon>mdi-home</v-icon>
         Beranda
      </v-btn>
      <v-btn>
         <v-icon>mdi-plus</v-icon>
         Konsultasi
      </v-btn>
      <v-btn>
         <v-icon>mdi-account-circle</v-icon>
         Pengguna
      </v-btn>
   </v-bottom-navigation>
</template>