<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Konsultasi Baru
         </h1>
      </div>

      <v-form ref="formRef" @submit.prevent="submit">
         <v-row>
            <v-col cols="12">
               <v-combobox
                  v-model="form.veterinarian_id"
                  :items="veterinarians"
                  label="Dokter"
                  placeholder="Pilih dokter..."
                  item-title="user.name"
                  item-value="id"
                  :loading="veterinarianLoading || loading"
                  :rules="validator.veterinarian_id"
                  :return-object="false"
               ></v-combobox>
            </v-col>

            <v-col cols="12">
               <v-combobox
                  v-model="form.pet_id"
                  :items="pets"
                  label="Hewan Peliharaan"
                  placeholder="Pilih hewan peliharaan..."
                  item-title="name"
                  item-value="id"
                  :loading="petLoading || loading"
                  :rules="validator.pet_id"
                  :return-object="false"
               ></v-combobox>
            </v-col>

            <v-col cols="12">
               <v-textarea
                  v-model="form.symptoms"
                  label="Gejala"
                  rows="3"
                  auto-grow
                  :rules="validator.symptoms"
               ></v-textarea>
            </v-col>

            <v-col cols="12">
               <v-btn
                  block
                  prepend-icon="mdi-plus"
                  type="submit"
                  :loading="loading"
               >
                  Buat Konsultasi
               </v-btn>
            </v-col>
         </v-row>
      </v-form>
   </v-container>
</template>

<script setup lang="ts">
const store = useAppStore()
const socketStore = useSocketStore()

const { data: veterinarians, pending: veterinarianLoading } = await useLazyAsyncData('fetch-vets', () => getVeterinarians({ page: 1, per_page: 1000, search: '', online: true }), {
   transform: (resp) => {
      return resp.data
   },
   default: () => [] as Model.Veterinarian[]
})

const { data: pets, pending: petLoading } = await useLazyAsyncData('fetch-pets', () => getPets({ page: 1, per_page: 1000, search: '' }), {
   transform: (resp) => {
      return resp.data
   },
   default: () => [] as Model.Pet[]
})

const formRef = ref<any>()
const form = ref<API.Request.Form.Consultation>({
   veterinarian_id: '',
   pet_id: '',
   symptoms: ''
})

const loading = ref<boolean>(false)

const validator = computed(() => ({
   veterinarian_id: [
      (v: string) => !!v || 'Dokter harus diisi',
   ],
   pet_id: [
      (v: string) => !!v || 'Hewan peliharaan harus diisi',
   ],
   symptoms: [
      (v: string) => !!v || 'Gejala harus diisi',
   ]
}))

const submit = async () => {
   if (!formRef.value.isValid) return

   loading.value = true
   await createConsultation(form.value)
      .then(resp => {
         store.notify(resp.message!, 'success')
         const consultationStore = useConsultationStore()
         consultationStore.consultation = resp.data
         socketStore.sendNotification('new-consultation', {
            consultation_id: resp.data.id,
            veterinarian_user_id: resp.data.veterinarian?.user?.id
         })
         navigateTo('/consultations/room')
      })
      .finally(() => loading.value = false)
}
</script>