<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Hewan Peliharaan
         </h1>
      </div>

      <v-row>
         <v-col cols="12">
            <div class="d-flex justify-betweeen gap-4">
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
                  @click.stop="prevPage"
               ></v-btn>

               <v-btn
                  icon="mdi-chevron-right"
                  variant="text"
                  :disabled="query.page == dataInfo.last_page"
                  @click.stop="nextPage"
               ></v-btn>
            </div>
         </v-col>

         <template v-if="pending">
            <v-col v-if="pets.length == 0" cols="6" v-for="n in 6">
               <v-card>
                  <v-card-item>
                     <v-skeleton-loader
                        type="image, list-item-two-line"
                     ></v-skeleton-loader>
                  </v-card-item>
               </v-card>
            </v-col>

            <v-col v-else cols="12">
               <v-progress-linear indeterminate></v-progress-linear>
            </v-col>
         </template>

         <template v-if="!pending && pets.length < 1">
            <v-col cols="12">
               <p class="text-center">
                  Tidak ada data tersedia.
               </p>
            </v-col>
         </template>

         <template v-if="pets.length > 0">
            <v-col
               v-for="item in pets"
               cols="6"
            >
               <v-card
                  :to="`/pets/${item.id}`"
               >
                  <v-img
                     src="/img/dummy-pet.jpg"
                     cover
                  ></v-img>
                  <v-card-item>
                     <v-card-title class="text-subtitle-1">{{ item.name }}</v-card-title>
                     <v-card-subtitle class="text-subtitle-2">Hewan Peliharaan</v-card-subtitle>
                  </v-card-item>
               </v-card>
            </v-col>

            <v-col cols="12">
               <p class="text-caption text-grey">
                  {{ `${dataInfo.from} - ${dataInfo.to} dari ${dataInfo.total} data` }}
               </p>
            </v-col>
         </template>
      </v-row>
   </v-container>
</template>

<script setup lang="ts">
const query = ref<API.Request.Query.Pet>({
   search: '',
   page: 1,
   per_page: 6
})

const dataInfo = ref({
   last_page: 0,
   total: 0,
   from: 0,
   to: 0
})

const { data: pets, pending, refresh } = await useLazyAsyncData('get-pets', () => getPets(query.value), {
   transform: (resp) => {
      const { last_page, total, to, from } = resp
      dataInfo.value.last_page = last_page
      dataInfo.value.total = total
      dataInfo.value.to = to
      dataInfo.value.from = from
      return resp.data
   },
   default: () => [] as Model.Pet[]
})

const nextPage = async () => {
   if (query.value.page == dataInfo.value.last_page) return
   (query.value.page as number)++
   await refresh()
}

const prevPage = async () => {
   if (query.value.page == 1) return
   (query.value.page as number)--
   await refresh()
}

const timeoutContainer = ref<any>(null)

watch(() => query.value.search, async () => {
   if (timeoutContainer.value) {
      clearTimeout(timeoutContainer.value)
   }

   pending.value = true
   timeoutContainer.value = setTimeout(refresh, 1000)
})
</script>