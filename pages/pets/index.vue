<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            Hewan Peliharaan
         </h1>
      </div>
      <v-data-iterator
         :items="pets"
         :page="query.page"
         :items-per-page="query.per_page"
      >
         <template #header>
            <div class="mb-4 d-flex gap-4">
               <v-text-field
                  v-model="query.search"
                  density="comfortable"
                  placeholder="Search"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
               ></v-text-field>

               <v-btn
                  icon="mdi-chevron-left"
                  variant="text"
                  :disabled="query.page == 1"
               ></v-btn>
               <v-btn
                  icon="mdi-chevron-right"
                  variant="text"
                  :disabled="query.page == lastPage"
               ></v-btn>
            </div>
         </template>

         <v-row dense>
            <v-col cols="12" v-for="item in pets">
               <v-card>
                  <v-card-item>
                     <div class="d-flex gap-4 align-center">
                        <v-avatar
                           color="primary"
                        >
                           J
                        </v-avatar>

                        <div class="">
                           <p class="text-subtitle-1">
                              {{ item.name }}
                           </p>
                           <p class="text-subtitle-2 text-grey">
                              Hewan Peliharaan
                           </p>
                        </div>
                     </div>
                  </v-card-item>
               </v-card>
            </v-col>
         </v-row>
      </v-data-iterator>
   </v-container>
</template>

<script setup lang="ts">
const query = ref<API.Request.Query.Pet>({
   search: '',
   page: 1,
   per_page: 10
})

const currentDataCount = ref<number>(0)
const total = ref<number>(0)
const lastPage = ref<number>(0)

const { data: pets, pending, refresh } = await useLazyAsyncData('get-pets', () => getPets(query.value), {
   transform: (resp) => {
      currentDataCount.value = resp.to
      total.value = resp.total
      lastPage.value = resp.last_page
      return resp.data
   },
   default: () => []
})
</script>