declare namespace API {
   namespace Request {
      namespace Query {
         type Pet = {
            search: string | null
            page: number | string
            per_page: number | string
         }
      }
   }
}