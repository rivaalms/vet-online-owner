<template>
   <template v-if="consultationStore.isWaitingVet">
      <div class="h-100 d-flex justify-center align-center">
         <v-card class="w-50">
            <v-card-text class="d-flex flex-column align-center gap-4">
               <p>Menunggu dokter...</p>

               <v-progress-circular
                  indeterminate
                  color="primary"
               ></v-progress-circular>
            </v-card-text>
         </v-card>
      </div>
   </template>

   <template v-if="consultationStore.getConsultationStatus == 'REJECTED'">
      <v-card class="w-50">
         <v-card-text class="d-flex flex-column align-center gap-4">
            <p>
               Permintaan konsultasi Anda ditolak dengan alasan:
            </p>

            <p class="font-weight-semibold">
               {{ consultationStore.consultation?.reject_reason }}
            </p>
         </v-card-text>
      </v-card>
   </template>
</template>

<script setup lang="ts">
const consultationStore = useConsultationStore()
</script>