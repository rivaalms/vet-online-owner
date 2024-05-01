export async function getVeterinarians(query: API.Request.Query.Veterinarian) {
   const response = await $api <API.Response<API.DataTable<Model.Veterinarian[]>>> (`/veterinarians`, {
      method: 'get',
      query
   })

   return response.data
}