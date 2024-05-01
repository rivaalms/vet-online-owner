<template>
   <v-card-text>
      <v-list>
         <template v-for="(item, n) in follow_ups">
            <v-list-item class="px-0">
               <v-card variant="outlined">
                  <v-card-item v-if="type == 'prescription'">
                     <div class="d-flex flex-column gap-4">
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Nama Obat
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.Prescription).medicine_name || '-' }}
                           </p>
                        </div>
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Kegunaan
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.Prescription).medicine_purpose || '-' }}
                           </p>
                        </div>
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Jumlah
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.Prescription).amount || '-' }}
                           </p>
                        </div>
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Dosis
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.Prescription).dosage || '-' }}
                           </p>
                        </div>
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Catatan
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.Prescription).note || '-' }}
                           </p>
                        </div>
                     </div>
                  </v-card-item>

                  <v-card-item v-else>
                     <div class="d-flex flex-column gap-4">
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Tanggal Rencana Pemeriksaan
                           </p>
                           <p class="text-subtitle-1">
                              {{ $date((item.ref as Model.FuturePhysicalVisit).check_up_date) || '-' }}
                           </p>
                        </div>
                        <div class="">
                           <p class="text-subtitle-2 text-grey-darken-2">
                              Dokter
                           </p>
                           <p class="text-subtitle-1">
                              {{ (item.ref as Model.FuturePhysicalVisit).veterinarian?.user?.name }}
                           </p>
                        </div>
                     </div>
                  </v-card-item>
               </v-card>
            </v-list-item>
         </template>
      </v-list>
   </v-card-text>
</template>

<script setup lang="ts">
type DialogData = {
   follow_ups: Model.FollowUp[]
   type: string
}

const { dialog } = useAppStore()
const { follow_ups, type }: DialogData = dialog.data
</script>