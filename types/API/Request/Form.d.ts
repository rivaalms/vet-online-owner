declare namespace API {
   namespace Request {
      namespace Form {
         type Login = {
            email: string
            password: string
         }

         type Pet = {
            name: string
            pet_owner_id: number
         }
      }
   }
}