declare namespace Model {
   type FollowUp = {
      id: number
      examination_id: number
      ref_type: string
      ref_id: number
      created_at: string
      updated_at: string
      examination?: Model.Examination
   }

   type Prescription = {
      id: number
      medicine_name: string
      medicine_purpose: string | null
      amount: number
      unit: string
      dosage: string
      note: string | null
      created_at: string
      updated_at: string
      follow_up: FollowUp
   }

   type FuturePhysicalVisit = {
      id: number
      check_up_date: string
      veterinarian_id: number
      created_at: string
      updated_at: string
      follow_up: FollowUp
      veterinarian?: Model.Veterinarian
   }
}