export async function getPets(query: API.Request.Query.Pet) {
   const response = await $api <API.Response<API.DataTable<Model.Pet[]>>> (`/pets`, {
      method: 'get',
      query
   })
   return response.data
}

export async function showPet(id: number|string) {
   const response = await $api <API.Response <Model.Pet>> (`/pet/${id}`, {
      method: 'get',
   })
   return response.data
}

export async function createPet(payload: API.Request.Form.Pet) {
   const response = await $api <API.Response<Model.Pet>> (`/pet`, {
      method: 'post',
      body: payload
   })
   return response.message!
}

export async function updatePet(id: number|string, payload: API.Request.Form.Pet) {
   const response = await $api <API.Response<Model.Pet>> (`/pet/${id}`, {
      method: 'put',
      body: payload
   })
   return response.message!
}

export async function deletePet(id: number|string) {
   const response = await $api <API.Response<boolean>> (`/pet/${id}`, {
      method: 'delete',
   })
   return response.message!
}