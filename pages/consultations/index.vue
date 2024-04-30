<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Riwayat Konsultasi
         </h1>

         <v-row>
            <v-col cols="12">
               <div class="d-flex justify-space-between gap-4">
                  <v-text-field
                     v-model="query.search"
                     placeholder="Cari"
                     prepend-inner-icon="mdi-magnify"
                     variant="outlined"
                     density="comfortable"
                     clearable
                  ></v-text-field>

                  <v-btn
                     icon="mdi-chevron-left"
                     variant="text"
                     :disabled="query.page == 1"
                     @click.stop="(query.page as number)++"
                  ></v-btn>

                  <v-btn
                     icon="mdi-chevron-right"
                     variant="text"
                     :disabled="query.page == dataInfo.last_page"
                     @click.stop="(query.page as number)--"
                  ></v-btn>
               </div>
            </v-col>

            <v-col cols="12">
               <template v-if="data.length < 0">
                  <v-progress-linear v-if="pending" indeterminate></v-progress-linear>

                  <p v-else class="text-center">
                     Tidak ada data tersedia.
                  </p>
               </template>

               <v-list v-else lines="three">
                  <template v-if="pending">
                     <v-list-item
                        v-for="n in 10"
                     >
                        <v-skeleton-loader
                           type="list-item-two-line"
                        ></v-skeleton-loader>
                     </v-list-item>
                  </template>

                  <template v-else>
                     <template v-for="item in data">
                        <v-list-item
                           :to="`/consultations/${item.id}`"
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
                     </template>
                  </template>
               </v-list>
            </v-col>

            <v-col v-if="data.length > 0" cols="12">
               <p class="text-caption text-grey">
                  {{ `${dataInfo.from} - ${dataInfo.to} dari ${dataInfo.total} data` }}
               </p>
            </v-col>
         </v-row>
      </div>


   </v-container>
</template>

<script setup lang="ts">
const dayjs = useDayjs()

const query = ref<API.Request.Query.Consultation>({
   search: '',
   page: 1,
   per_page: 10
})

const dataInfo = ref({
   last_page: 0,
   total: 0,
   from: 0,
   to: 0
})

const { data, pending, refresh } = await useLazyAsyncData('get-consultations', () => getConsultations(query.value), {
   transform: (resp) => {
      const { last_page, total, to, from } = resp
      dataInfo.value.last_page = last_page
      dataInfo.value.total = total
      dataInfo.value.to = to
      dataInfo.value.from = from
      return resp.data
   },
   default: () => [] as Model.Consultation[],
   watch: [() => query.value.page]
})

const timeoutContainer = ref<any>(null)

watch(() => query.value.search, async () => {
   if (timeoutContainer.value) {
      clearTimeout(timeoutContainer.value)
   }

   pending.value = true
   timeoutContainer.value = setTimeout(refresh, 100)
})
</script>