declare namespace Model {
   type Pet = {
      id: number
      name: string
      pet_owner_id: number
      created_at: string
      updated_at: string
      owner?: Model.PetOwner
   }
}