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

export function $date(date: string) {
   const dayjs = useDayjs()
   return dayjs(date).format('DD MMM YYYY | HH:mm')
}

export function $jsonify <T> (data: T) {
   return JSON.parse(JSON.stringify(data)) as T
}