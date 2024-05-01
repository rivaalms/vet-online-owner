declare namespace Model {
   type Examination = {
      id: number
      consultation_id: number
      diagnose: string
      recommendation: string | null
      created_at: string
      updated_at: string
      consultation?: Model.Consultation
      follow_ups?: Model.FollowUp[]
   }
}