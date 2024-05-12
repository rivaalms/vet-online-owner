export function useSocketConnection() {
   const { socket, ping, unregister } = useSocketStore()

   socket.on('connect', () => {
      console.info('Socket connected')
      ping()

      window.onbeforeunload = () => {
         unregister()
      }
   })

   socket.on('disconnect', (reason) => {
      console.info('Socket disconnected:', reason)
   })

   socket.on('notification', (message) => {
      console.info('Socket notification:', message.id)
      switch (message.id) {
         case 'consultation-rejected':
            onConsultationRejected(message)
            break
         default:
            break
      }
   })
}

async function onConsultationRejected(message: any) {
   const { data } = message
   const consultationStore = useConsultationStore()

   await showConsultation(data.consultation_id)
      .then(resp => {
         consultationStore.consultation = resp
      })
}