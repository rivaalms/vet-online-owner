<template>
   <v-fab
      icon="mdi-plus"
      location="bottom"
      app
      absolute
      @click.stop="actionDrawer.show = true"
   ></v-fab>

   <v-bottom-sheet v-model="actionDrawer.show">
      <v-list color="primary">
         <v-list-item
            v-for="(item, index) in actionListItem"
            :key="index"
            :prepend-icon="item.icon"
            :title="item.label"
            :to="item.to"
            @click.stop="actionDrawer.show = false"
         ></v-list-item>
      </v-list>
   </v-bottom-sheet>
</template>

<script setup lang="ts">
const { actionDrawer } = useAppStore()

const actionListItem = ref<any>([
   {
      icon: 'mdi-clipboard-plus',
      label: 'Konsultasi',
      to: '/consultations/create'
   },
   {
      icon: 'mdi-paw',
      label: 'Hewan Peliharaan',
      to: '/pets/create'
   }
])
</script>