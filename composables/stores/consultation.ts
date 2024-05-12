import { defineStore } from "pinia"

type State = {
   // isWaitingVet: boolean
   consultation: Model.Consultation | null
}

export const useConsultationStore = defineStore('vet-online-owner-consultation', {
   persist: true,

   state: (): State => ({
      // isWaitingVet: false,
      consultation: null,
   }),

   getters: {
      isInConsultation: (state) => !!state.consultation,
      isWaitingVet: (state) => state.consultation?.status === 'PENDING' || false,
      getConsultationStatus: (state) => state.consultation?.status || null
   }
})