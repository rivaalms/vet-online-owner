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
   dialog: {
      show: boolean
      id: string|null
      title: string
      data: any
      callback?: (() => any)
   }
}

export const useAppStore = defineStore('vet-online-owner-app', {
   state: () : State => ({
      snackbar: {
         show: false,
         text: '',
         color: ''
      },
      actionDrawer: {
         show: false
      },
      dialog: {
         show: false,
         id: null,
         title: '',
         data: null,
         callback: undefined
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
      },

      showDialog(id: string, title: string, data?: any, callback?: () => any) {
         this.dialog.show = true
         this.dialog.data = data
         this.dialog.id = id
         this.dialog.title = title
         this.dialog.callback = callback
      },

      clearDialog() {
         this.dialog.show = false

         setTimeout(() => {
            this.dialog.data = null
            this.dialog.callback = undefined
            this.dialog.id = null
            this.dialog.title = ''
         }, 500)
      }
   }
})