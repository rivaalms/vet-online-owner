export async function getPets(query: API.Request.Query.Pet) {
   const response = await $api <API.Response<API.DataTable<Model.Pet[]>>> (`/pets`, {
      method: 'get',
      query
   })
   return response.data
}

export async function createPet(payload: API.Request.Form.Pet) {
   const response = await $api <API.Response<API.DataTable<Model.Pet>>> (`/pet`, {
      method: 'post',
      body: payload
   })
   return response.message!
}