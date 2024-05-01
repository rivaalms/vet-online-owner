<template>
   <v-dialog
      v-model="dialog.show"
   >
      <v-card>
         <v-card-title class="d-flex justify-space-between gap-4 align-center">
            <p class="">
               {{ dialog.title }}
            </p>

            <v-btn
               icon="mdi-close"
               variant="text"
               density="comfortable"
               color="grey"
               @click.stop="clearDialog"
            ></v-btn>
         </v-card-title>

         <v-card-item v-if="!dialogBody">
            <v-skeleton-loader type="sentences, actions"></v-skeleton-loader>
         </v-card-item>

         <component v-else :is="dialogBody"/>
      </v-card>
   </v-dialog>
</template>

<script setup lang="ts">
const { dialog, clearDialog } = useAppStore()

const componentMap : Wildcard = {
   'delete-pet': () => import('@/components/dialogs/delete-pet.vue'),
   'update-pet': () => import('@/components/dialogs/update-pet.vue'),
   'follow-up': () => import('@/components/dialogs/follow-up.vue')
}

const dialogBody = ref<any>(null)

watch(() => dialog.show, async (val) => {
   if (val && dialog.id) {
      const component = componentMap[dialog.id]
      if (component) dialogBody.value = (await component()).default
   }
})
</script>