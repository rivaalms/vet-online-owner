declare namespace Model {
   type User = {
      id: number
      name: string
      email: string
      ref_type: string | null
      ref_id: number | null
      ref?: Veterinarian | PetOwner
      created_at?: string
      updated_at?: string
   }

   type Veterinarian = {
      id: number
      str: string
      is_online: boolean
      created_at: string
      updated_at: string
      user?: Model.User
   }

   type PetOwner = {
      id: number
      address: string
      phone_number: string
      created_at: string
      updated_at: string
      user?: Model.User
      pets?: Model.Pet[]
   }
}