import { defineStore } from 'pinia'

export const useAppStore = defineStore('vet-online-owner-app', {
   state: () => ({
      snackbar: {
         show: false,
         text: '',
         color: ''
      }
   }),

   actions: {
      notify(text: string, color: string) {
         this.snackbar.show = true
         this.snackbar.text = text
         this.snackbar.color = color
      },

      resetSnackbar() {
         this.snackbar = {
            show: false,
            text: '',
            color: ''
         }
      }
   }
})