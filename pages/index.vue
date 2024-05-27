<template>
   <v-container class="d-flex flex-column gap-4">
      <v-card
         color="primary"
      >
         <v-card-text class="font-weight-semibold text-h6">
            Selamat datang, <br>
            {{ authStore.getUser?.name }}
         </v-card-text>
      </v-card>

      <v-card title="Konsultasi berlangsung">
         <v-card-text>
            <v-list lines="three">
               <v-list-item
                  v-for="item in consultations"
                  :key="item.id"
                  @click.stop="openConsultation(item)"
               >
                  <v-list-item-title
                     class="d-flex justify-space-between align-center"
                  >
                     <p>{{ item.pet?.name }}</p>
                     <v-chip
                        :color="$statusChipColor(item.status)"
                        size="small"
                     >
                        {{ item.status }}
                     </v-chip>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                     <p>
                        Dokter: {{ item.veterinarian?.user?.name }}
                     </p>

                     <p>
                        {{ dayjs(item.created_at).format('DD MMM YYYY | HH:mm') }}
                     </p>
                  </v-list-item-subtitle>
               </v-list-item>
            </v-list>
         </v-card-text>
      </v-card>
   </v-container>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const consultationStore = useConsultationStore()
const dayjs = useDayjs()
const consultationQuery = ref<API.Request.Query.Consultation>({
   page: 1,
   per_page: 5,
   search: '',
   status: 'ON PROGRESS'
})
const { data: consultations } = await useLazyAsyncData('consultations', () => getConsultations(consultationQuery.value), {
   transform: (resp) => resp.data,
   default: () => [] as Model.Consultation[],
   watch: [() => consultationQuery.value.page, () => consultationQuery.value.status]
})

const openConsultation = (data: Model.Consultation) => {
   consultationStore.consultation = data
   navigateTo('/consultations/room')
}
</script>