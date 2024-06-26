declare namespace API {
   namespace Request {
      namespace Query {
         type Pet = {
            search: string | null
            page: number | string
            per_page: number | string
         }

         type Veterinarian = {
            search: string | null
            online: boolean
            page: number | string
            per_page: number | string
         }

         type Consultation = {
            search: string | null
            status?: string
            page: number | string
            per_page: number | string
         }

         type Examination = {
            search: string | null
            consultation?: number | string | null
            page: number | string
            per_page: number | string
         }
      }
   }
}