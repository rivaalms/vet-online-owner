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
      <div class="h-100 d-flex justify-center align-center">
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
      </div>
   </template>

   <v-container
      class="fill-height my-16"
      id="chat-container"
   >
      <v-row
         class="fill-height"
         align="end"
      >
         <v-col class="d-flex flex-column gap-4">
            <v-card
               v-for="(chat, index) in consultationStore.chats"
               :id="`chat-${index}`"
               variant="flat"
               :color="consultationStore.consultation?.pet?.owner?.user?.id == chat.from ? 'primary' : 'grey-lighten-3'"
               class="d-flex flex-row align-center w-50 rounded-pill"
               :class="{
                  'align-self-end': chat.from === consultationStore.consultation?.pet?.owner?.user?.id,
                  [consultationStore.consultation?.pet?.owner?.user?.id == chat.from ? 'rounded-be-0' : 'rounded-bs-0']: true
               }"
            >
               <v-card-text>
                  {{ chat.message }}
               </v-card-text>
            </v-card>
         </v-col>
      </v-row>
   </v-container>

   <v-footer fixed app>
      <consultation-text-box></consultation-text-box>
   </v-footer>
</template>

<script setup lang="ts">
definePageMeta({
   layout: 'consultation-room'
})
const consultationStore = useConsultationStore()

watch(() => consultationStore.chats.length, async (val) => {
   await new Promise((resolve) => setTimeout(resolve, 200))
      .then(() => {
         window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      })
}, {
   immediate: true
})

onBeforeMount(async () => {
   if (consultationStore.isInConsultation) {
      await getConsultationChats(consultationStore.consultation?.id as number)
         .then((resp) => {
            const { data } = resp
            console.log(data)
            // consultationStore.chats =
         })
   }
})
</script>