<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Tambah Peliharaan
         </h1>
      </div>

      <v-form ref="formRef" @submit.prevent="submit">
         <v-row>
            <v-col cols="12">
               <v-text-field
                  label="Pemilik"
                  :model-value="user?.name"
                  readonly
                  variant="outlined"
                  hint="Readonly"
                  persistent-hint
                  :disabled="loading"
               ></v-text-field>
            </v-col>

            <v-col cols="12">
               <v-text-field
                  v-model="form.name"
                  label="Nama"
                  :rules="validator.name"
                  :disabled="loading"
               ></v-text-field>
            </v-col>

            <v-col cols="12">
               <v-btn
                  block
                  prepend-icon="mdi-plus"
                  type="submit"
                  :loading="loading"
               >
                  Tambah
               </v-btn>
            </v-col>
         </v-row>
      </v-form>
   </v-container>
</template>

<script setup lang="ts">
const { getUser: user } = useAuthStore()
const store = useAppStore()

const loading = ref<boolean>(false)
const formRef = ref<any>()
const form = ref<API.Request.Form.Pet>({
   name: '',
   pet_owner_id: user?.ref_id || 0
})

const validator = computed(() => ({
   name: [
      (v: string) => !!v || 'Nama harus diisi',
   ],
   pet_owner_id: [
      (v: string) => !!v || 'Pemilik harus diisi',
   ]
}))

const submit = async () => {
   if (!formRef.value.isValid) return

   loading.value = true
   await createPet(form.value)
      .then((resp) => {
         store.notify(resp, 'success')
         navigateTo('/pets')
      })
      .finally(() => loading.value = false)
}
</script>