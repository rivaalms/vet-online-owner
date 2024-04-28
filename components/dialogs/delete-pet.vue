<template>
   <v-card-item>
      <p class="mb-4">
         Anda yakin ingin menghapus hewan peliharaan: {{ dialog.data.name }}
      </p>
   </v-card-item>

   <v-card-actions class="d-flex justify-end">
      <v-btn
         color="grey"
         variant="outlined"
         :disabled="loading"
         @click.stop="clearDialog"
      >
         Batal
      </v-btn>

      <v-btn
         color="error"
         variant="flat"
         prepend-icon="mdi-delete"
         :loading="loading"
         @click.stop="confirmDelete"
      >
         Hapus
      </v-btn>
   </v-card-actions>
</template>

<script setup lang="ts">
const { dialog, clearDialog, notify } = useAppStore()
const loading = ref<boolean>(false)

const confirmDelete = async () => {
   loading.value = true
   await deletePet(dialog.data.id)
      .then((resp) => {
         notify(resp, 'success')
         if (dialog.callback) dialog.callback()
         clearDialog()
      })
      .finally(() => loading.value = false)
}
</script>