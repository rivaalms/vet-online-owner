declare namespace Model {
   type Consultation = {
      id: number
      veterinarian_id: number
      pet_id: number
      symptoms: string
      status: 'PENDING' | 'ON PROGRESS' | 'ENDED' | 'FINISHED' | 'REJECTED'
      reject_reason: string | null
      date_started: string | null
      date_finished: string | null
      created_at: string
      updated_at: string
      veterinarian?: Model.Veterinarian
      pet?: Model.Pet
   }

   namespace Consultation {
      type Chat = {
         id: number
         consultation_id: number
         data: ChatData[]
      }

      type ChatData = {
         consultation_id?: number
         to: number
         from: number
         message: string
         time: string
      }
   }
}