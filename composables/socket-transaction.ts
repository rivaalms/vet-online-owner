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
}