<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Detail Konsultasi
         </h1>
      </div>

      <div class="d-flex flex-column gap-4">
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

         <p class="text-h6">
            Hasil Pemeriksaan
         </p>

         <v-card>
            <v-card-item>
               <template v-if="examPending">
                  <template v-if="(examinations?.data.length || 0) < 1">
                     <v-skeleton-loader
                        v-for="n in 5"
                        type="list-item-three-line"
                     ></v-skeleton-loader>
                  </template>

                  <template v-else>
                     <v-progress-linear indeterminate></v-progress-linear>
                  </template>
               </template>

               <template v-else>
                  <template v-if="(examinations?.data.length || 0) < 1">
                     <p class="text-center">
                        Tidak ada hasil pemeriksaan.
                     </p>
                  </template>

                  <template v-else>
                     <v-list>
                        <v-list-item
                           v-for="item in examinations?.data"
                        >
                           <v-row>
                              <v-col cols="12">
                                 <p class="text-subtitle-2 text-grey-darken-1">
                                    Diagnosa
                                 </p>
                                 <p class="text-subtitle-1">
                                    {{ item.diagnose }}
                                 </p>
                              </v-col>
                              <v-col cols="12">
                                 <p class="text-subtitle-2 text-grey-darken-1">
                                    Rekomendasi
                                 </p>
                                 <p class="text-subtitle-1">
                                    {{ item.recommendation }}
                                 </p>
                              </v-col>
                              <v-col cols="12">
                                 <p class="text-subtitle-2 text-grey-darken-1">
                                    Follow Up
                                 </p>
                                 <div style="overflow-x:auto;">
                                    <div v-if="isFollowUpBtnShown(item)" class="d-flex gap-4" style="width:fit-content;">
                                       <v-btn
                                          v-if="countFollowUpTypes(item.follow_ups || []).prescriptions > 0"
                                          class="text-subtitle-2"
                                          color="teal-darken-1"
                                          variant="tonal"
                                          @click.stop="showDialog('follow-up', 'Resep Obat', { follow_ups: item.follow_ups?.filter(item => item.ref_type == 'prescription'), type: 'prescription' })"
                                       >
                                          Resep Obat
                                          <template #append>
                                             <v-chip size="x-small">
                                                {{ countFollowUpTypes(item.follow_ups || []).prescriptions }}
                                             </v-chip>
                                          </template>
                                       </v-btn>
                                       <v-btn
                                          v-if="countFollowUpTypes(item.follow_ups || []).future_physical_visit > 0"
                                          class="text-subtitle-2"
                                          color="pink"
                                          variant="tonal"
                                          @click.stop="showDialog('follow-up', 'Pemeriksaan Fisik', { follow_ups: item.follow_ups?.filter(item => item.ref_type == 'future_physical_visit'), type: 'future_physical_visit' })"
                                       >
                                          Pemeriksaan Fisik
                                          <template #append>
                                             <v-chip size="x-small">
                                                {{ countFollowUpTypes(item.follow_ups || []).future_physical_visit }}
                                             </v-chip>
                                          </template>
                                       </v-btn>
                                    </div>

                                    <p v-else class="text-subtitle-1">
                                       Tidak ada follow up
                                    </p>
                                 </div>
                              </v-col>
                           </v-row>
                        </v-list-item>
                     </v-list>
                  </template>
               </template>
            </v-card-item>
         </v-card>
      </div>
   </v-container>
</template>

<script setup lang="ts">
const { showDialog } = useAppStore()
const consultationId = useRoute().params.id as string

const { data: consultation, pending, refresh } = await useLazyAsyncData('show-consultation', () => showConsultation(consultationId))

const examQuery = ref<API.Request.Query.Examination>({
   search: null,
   consultation: consultationId,
   page: 1,
   per_page: 5
})

const { data: examinations, pending: examPending, refresh: fetchExaminations } = await useLazyAsyncData('get-examinations', () => getExaminations(examQuery.value))

const countFollowUpTypes = (followUps: Model.FollowUp[]) => {
   const prescriptions = followUps.filter(item => item.ref_type == 'prescription')
   const futureVisit = followUps.filter(item => item.ref_type == 'future_physical_visit')

   return {
      prescriptions: prescriptions.length,
      future_physical_visit: futureVisit.length
   }
}

const isFollowUpBtnShown = (item: Model.Examination) => {
   return countFollowUpTypes(item.follow_ups || []).prescriptions > 0 || countFollowUpTypes(item.follow_ups || []).future_physical_visit > 0
}
</script>