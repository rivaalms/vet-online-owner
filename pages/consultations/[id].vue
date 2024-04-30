<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Detail Konsultasi
         </h1>
      </div>

      <v-card>
         <template v-if="pending">
            <v-card-item>
               <v-skeleton-loader
                  type="list-item-three-line"
               ></v-skeleton-loader>
            </v-card-item>
         </template>

         <template v-else>
            <v-card-text>
               <v-row>
                  <v-col cols="12">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Status
                     </p>
                     <v-chip
                        :color="$statusChipColor(consultation?.status || '')"
                     >
                        {{ consultation?.status }}
                     </v-chip>
                  </v-col>
                  <v-col cols="12">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Alasan ditolak
                     </p>
                     {{ consultation?.reject_reason }}
                  </v-col>
                  <v-col cols="6">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Hewan Peliharaan
                     </p>
                     <p class="text-subtitle-1">
                        {{ consultation?.pet?.name }}
                     </p>
                  </v-col>
                  <v-col cols="6">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Dokter
                     </p>
                     <p class="text-subtitle-1">
                        {{ consultation?.veterinarian?.user?.name }}
                     </p>
                  </v-col>
                  <v-col cols="12">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Keluhan
                     </p>
                     <p class="text-subtitle-1">
                        {{ consultation?.symptoms }}
                     </p>
                  </v-col>
                  <v-col cols="6">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Tanggal dimulai
                     </p>
                     <p class="text-subtitle-1">
                        {{ consultation?.date_started ? $date(consultation?.date_started) : '-' }}
                     </p>
                  </v-col>
                  <v-col cols="6">
                     <p class="text-subtitle-2 text-grey-darken-1">
                        Tanggal selesai
                     </p>
                     <p class="text-subtitle-1">
                        {{ consultation?.date_finished ? $date(consultation?.date_finished) : '-' }}
                     </p>
                  </v-col>
               </v-row>
            </v-card-text>
         </template>
      </v-card>
   </v-container>
</template>

<script setup lang="ts">
const dayjs = useDayjs()
const consultationId = useRoute().params.id as string

const { data: consultation, pending, refresh } = await useLazyAsyncData('show-consultation', () => showConsultation(consultationId))

const examQuery = ref<API.Request.Query.Examination>({
   search: null,
   consultation: consultation.value?.id,
   page: 1,
   per_page: 5
})

const { data: examinations, pending: examPending, refresh: fetchExaminations } = await useLazyAsyncData('get-examinations', () => getExaminations(examQuery.value), {
   immediate: false
})

const unwatchConsultation = watch(consultation, async (val) => {
   if (val) {
      await fetchExaminations()
         .then(() => {
            unwatchConsultation()
         })
   }
})
</script>