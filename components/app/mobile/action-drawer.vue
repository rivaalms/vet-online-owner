<template>
   <v-fab
      icon="mdi-plus"
      app
      location="bottom"
      @click.stop="actionDrawer.show = true"
   ></v-fab>

   <v-bottom-sheet v-model="actionDrawer.show">
      <v-list>
         <v-list-item
            v-for="(item, index) in actionListItem"
            :key="index"
            :prepend-icon="item.icon"
            :title="item.label"
            @click="void(0)"
         ></v-list-item>
      </v-list>
   </v-bottom-sheet>
</template>

<script setup lang="ts">
const { actionDrawer } = useAppStore()

const actionListItem = ref<any>([
   {
      icon: 'mdi-clipboard-plus',
      label: 'Konsultasi'
   },
   {
      icon: 'mdi-paw',
      label: 'Hewan Peliharaan'
   }
])
</script>