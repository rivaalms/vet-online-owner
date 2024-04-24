<template>
   <v-bottom-navigation
      tag="footer"
      class="w-100"
      color="primary"
      :elevation="24"
      grow
   >
      <v-btn
         v-for="(item, index) in menu"
         :key="index"
         :to="item.to"
         exact
      >
         <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
   </v-bottom-navigation>
</template>

<script setup lang="ts">
const menu = useNavigationMenu()
</script>