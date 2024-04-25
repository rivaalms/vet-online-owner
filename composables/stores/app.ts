import { defineStore } from 'pinia'

type State = {
   snackbar: {
      show: boolean
      text: string
      color: string
   }
   actionDrawer: {
      show: boolean
   }
}

export const useAppStore = defineStore('vet-online-owner-app', {
   state: () => ({
      snackbar: {
         show: false,
         text: '',
         color: ''
      },
      actionDrawer: {
         show: false
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