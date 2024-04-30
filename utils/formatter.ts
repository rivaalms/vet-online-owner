export function $statusChipColor(status: string) {
   switch (status) {
      case 'PENDING':
         return 'grey'
      case 'ON PROGRESS':
         return 'amber'
      case 'ENDED':
         return 'blue'
      case 'FINISHED':
         return 'success'
      case 'REJECTED':
         return 'error'
      default:
         return 'grey'
   }
}