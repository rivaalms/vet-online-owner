<template>
   <v-container class="mb-12">
      <div class="mb-4">
         <h1 class="font-weight-medium">
            {{ pet.name }}
         </h1>
      </div>

      <v-card>
         <template v-if="pending">
            <v-card-item>
               <v-skeleton-loader
                  type="image, list-item-three-line"
               ></v-skeleton-loader>
            </v-card-item>
         </template>

         <template v-else>
            <v-img
               src="/img/dummy-pet.jpg"
               cover
            ></v-img>
            <v-card-item>
               <div class="d-flex align-center justify-space-between">
                  <div class="">
                     <v-card-title>{{ pet.name }}</v-card-title>
                     <v-card-subtitle>Anjing</v-card-subtitle>
                  </div>

                  <v-menu>
                     <template #activator="{ props }">
                        <v-icon
                           v-bind="props"
                        >
                           mdi-dots-vertical
                        </v-icon>
                     </template>

                     <v-list>
                        <v-list-item
                           v-for="item in menuItems"
                           @click.stop="item.onclick"
                        >
                           <template #prepend>
                              <v-icon>{{ item.icon }}</v-icon>
                           </template>
                           <v-list-item-title>
                              {{ item.title }}
                           </v-list-item-title>
                        </v-list-item>
                     </v-list>
                  </v-menu>
               </div>
            </v-card-item>

            <v-card-text>
               <v-list>
                  <v-list-item>
                     <v-list-item-title>
                        Umur
                     </v-list-item-title>
                     <v-list-item-subtitle>
                        {{ age }}
                     </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                     <v-list-item-title>
                        Tanggal Lahir
                     </v-list-item-title>
                     <v-list-item-subtitle>
                        {{ dayjs(pet.created_at).format('DD MMM YYYY') }}
                     </v-list-item-subtitle>
                  </v-list-item>
               </v-list>
            </v-card-text>
         </template>
      </v-card>
   </v-container>
</template>

<script setup lang="ts">
const dayjs = useDayjs()

const { data: pet, pending, refresh } = useLazyAsyncData('show-pet', () => showPet(useRoute().params.id as string), {
   default: () => ({
      id: 0,
      name: '',
      pet_owner_id: 0,
      created_at: '',
      updated_at: '',
   } as Model.Pet)
})

const age = computed(() => {
   const birth = dayjs(pet.value.created_at)
   const current = dayjs()

   const year = current.diff(birth, 'year')
   const month = current.diff(birth.add(year, 'year'), 'month')
   const day = current.diff(birth.add(year, 'year').add(month, 'month'), 'day')

   return `${year} tahun ${month} bulan ${day} hari`
})

const menuItems = computed(() => [
   {
      title: 'Sunting',
      icon: 'mdi-pencil',
      onclick: () => useAppStore().showDialog('update-pet', 'Sunting Hewan Peliharaan', pet.value, refresh)
   },
   {
      title: 'Hapus',
      icon: 'mdi-delete',
      onclick: () => attemptDelete()
   }
])

const attemptDelete = async () => {
   useAppStore().showDialog('delete-pet', 'Hapus Hewan Peliharaan', pet.value, () => navigateTo('/pets'))
}
</script>