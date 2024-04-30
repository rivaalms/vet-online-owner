type LoginRes = {
   user: Model.User
   token: string
}

export async function login(payload: API.Request.Form.Login) : Promise <LoginRes> {
   const response = await $api <API.Response <LoginRes>> ('/login', {
      method: 'post',
      body: payload
   })

   return response.data
}

export async function logout() : Promise <string> {
   const response = await $api <API.Response <null>> (`/logout`, {
      method: 'post',
   })

   return response.message!
}

export async function me() : Promise <Model.User> {
   const response = await $api <API.Response <Model.User>> (`/me`, {
      method: 'get'
   })
   return response.data
}