<template>
   <v-container
      class="d-flex pa-0 gap-4"
   >
      <v-textarea
         v-model="message"
         :rows="1"
         :max-rows="4"
         auto-grow
         @keydown.enter.exact.prevent="sendMessage"
         @keydown.shift.enter.exact.prevent="message += '\n'"
      ></v-textarea>

      <v-btn
         v-if="message && message.length"
         icon="mdi-send"
         @click.stop="sendMessage"
      ></v-btn>
   </v-container>
</template>

<script setup lang="ts">
const dayjs = useDayjs()
const consultationStore = useConsultationStore()
const socketStore = useSocketStore()

const message = ref('')

async function sendMessage() {
   const payload = {
      consultation_id: consultationStore.consultation?.id as number,
      to: consultationStore.consultation?.veterinarian?.user?.id as number,
      from: consultationStore.consultation?.pet?.owner?.user?.id as number,
      message: message.value as string,
      time: dayjs().format()
   }

   await new Promise(resolve => {
      resolve(socketStore.sendChat('text', payload))
   })
      .then(() => {
         consultationStore.chats.push(payload)
         message.value = ''
      })
}
</script>