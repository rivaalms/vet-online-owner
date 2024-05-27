export async function getConsultations(query: API.Request.Query.Consultation) {
   const response = await $api <API.Response<API.DataTable<Model.Consultation[]>>> (`/consultations`, {
      method: 'get',
      query
   })

   return response.data
}

export async function showConsultation(id: number|string) {
   const response = await $api <API.Response<Model.Consultation>> (`/consultation/${id}`, {
      method: 'get'
   })

   return response.data
}

export async function createConsultation(payload: API.Request.Form.Consultation) {
   const response = await $api <API.Response<Model.Consultation>> (`/consultation`, {
      method: 'post',
      body: payload
   })

   return response
}

export async function getConsultationChats(consultationId: number|string) {
   const response = await $api <API.Response<any>> (`/consultation-chats/${consultationId}`, {
      method: 'get'
   })
   return response.data
}