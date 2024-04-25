declare namespace API {
   type Response <T> = {
      success: boolean
      data: T
      message: string | null
   }

   type DataTable <T> = {
      current_page: number
      data: T
      first_page_url: string
      from: number
      last_page: number
      last_page_url: string
      links: Array<DataTableLink>
      next_page_url: string | null
      path: string
      per_page: number
      prev_page_url: string | null
      to: number
      total: number
   }
}

type DataTableLink = {
   url: string | null
   label: string
   active: boolean
}