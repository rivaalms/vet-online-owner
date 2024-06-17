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

   <v-sheet
      class="pa-2 d-flex flex-column ga-4 consultation-chat-area"
   >
      <div class="flex-grow-1 overflow-y-auto px-2" ref="overflowContainer">
         <div id="message-container" ref="msgContainer" class="d-flex flex-column ga-2">
            <template v-for="(chat, index) in consultationStore.chats">
               <div>
                  <v-card
                     :id="`chat-${index}`"
                     variant="flat"
                     :color="consultationStore.consultation?.pet?.owner?.user?.id == chat.from ? 'primary' : 'grey-lighten-3'"
                     class="d-flex flex-row align-center w-50 rounded-pill"
                     :class="{
                        'align-self-end': chat.from == consultationStore.consultation?.pet?.owner?.user?.id,
                        [consultationStore.consultation?.pet?.owner?.user?.id == chat.from ? 'rounded-be-0 float-right' : 'rounded-bs-0 float-left']: true
                     }"
                  >
                     <v-card-text>
                        {{ chat.message }}
                     </v-card-text>
                  </v-card>
               </div>
            </template>
         </div>
      </div>
      <div class="">
         <consultation-text-box></consultation-text-box>
      </div>
   </v-sheet>
</template>

<script setup lang="ts">
const consultationStore = useConsultationStore()
const msgContainer = ref<any>()
const overflowContainer = ref<any>()

watch(() => consultationStore.chats, async (val) => {
   await scrollChatContainerToBottom()
}, {
   deep: true
})

async function scrollChatContainerToBottom() {
   await nextTick(() => {
      overflowContainer.value.scrollTo({
         top: msgContainer.value.scrollHeight,
      })
   })
}

onMounted(async () => {
   await scrollChatContainerToBottom()
})

onBeforeMount(async () => {
   consultationStore.chats = []
   if (consultationStore.isInConsultation) {
      await getConsultationChats(consultationStore.consultation?.id as number)
         .then((resp) => {
            const { data } = resp
            consultationStore.chats = data
         })
   }
})
</script>

<style scoped>
.consultation-chat-area {
   height: calc(100dvh - 64px);
}
</style>