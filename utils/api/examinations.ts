export async function getExaminations(query: API.Request.Query.Examination) {
   const response = await $api <API.Response<API.DataTable<Model.Examination[]>>> (`/examinations`, {
      method: 'get',
      query
   })

   return response.data
}