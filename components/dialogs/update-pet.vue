<template>
   <v-form ref="formRef" @submit.prevent="submit">
      <v-card-text>
         <v-row>
            <v-col cols="12">
               <v-text-field
                  label="Pemilik"
                  :model-value="user?.name"
                  readonly
                  hint="Readonly"
                  presistent-hint
                  :disabled="loading"
               ></v-text-field>
            </v-col>

            <v-col cols="12">
               <v-text-field
                  v-model="form.name"
                  label="Nama"
                  :rules="[requiredValidator]"
                  :disabled="loading"
               ></v-text-field>
            </v-col>
         </v-row>
      </v-card-text>

      <v-card-actions class="d-flex justify-end">
         <v-btn
            color="grey"
            variant="outlined"
            @click.stop="clearDialog"
         >
            Batal
         </v-btn>

         <v-btn
            color="info"
            variant="flat"
            prepend-icon="mdi-pencil"
            type="submit"
            :loading="loading"
         >
            Perbarui
         </v-btn>
      </v-card-actions>
   </v-form>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { dialog, clearDialog, notify } = useAppStore()
const { getUser: user } = authStore

const formRef = ref<any>()
const form = ref<any>({
   name: dialog.data.name,
   pet_owner_id: authStore.getUser?.ref_id
})

const requiredValidator = (v: any) => !!v || 'Wajib diisi'
const loading = ref<boolean>(false)

const submit = async () => {
   loading.value = true
   await updatePet(dialog.data.id, form.value)
      .then((resp) => {
         notify(resp, 'success')
         if (dialog.callback) dialog.callback()
         clearDialog()
      })
      .finally(() => loading.value = false)
}
</script>