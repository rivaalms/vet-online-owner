<template>
   <v-bottom-navigation
      tag="footer"
      class="w-100"
      color="primary"
      :elevation="24"
      grow
   >
      <template
         v-for="item in menu"
      >
         <v-btn
            variant="plain"
            :to="item.to"
            exact
            :ripple="false"
            style="opacity:1;"
         >
            <v-icon>{{ item.icon }}</v-icon>
         </v-btn>
      </template>
   </v-bottom-navigation>
</template>

<script setup lang="ts">
const menu = useNavigationMenu()
</script>