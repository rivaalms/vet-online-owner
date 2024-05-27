import { defineStore } from "pinia"

type State = {
   // isWaitingVet: boolean
   consultation: Model.Consultation | null
   chats: {
      consultation_id: number
      from: number
      to: number
      message: string | null
   }[]
}

export const useConsultationStore = defineStore('vet-online-owner-consultation', {
   persist: true,

   state: (): State => ({
      consultation: null,
      chats: []
   }),

   getters: {
      isInConsultation: (state) => !!state.consultation,
      isWaitingVet: (state) => state.consultation?.status === 'PENDING' || false,
      getConsultationStatus: (state) => state.consultation?.status || null,
      getChats: (state) => state.chats
   }
})