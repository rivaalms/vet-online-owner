<template>
   <v-container class="h-100 d-flex justify-center align-center">
      <div class="w-100">
         <p class="mb-8 font-weight-bold text-primary text-center">
            Vet Online
         </p>

         <h1 class="">Selamat datang</h1>
         <p class="text-grey">Silakan login untuk melanjutkan</p>

         <v-form ref="formRef" class="mt-8" @submit.prevent="submit">
            <v-row>
               <v-col cols="12">
                  <v-text-field
                     v-model="form.email"
                     :rules="validator.email"
                     placeholder="Email"
                     type="email"
                     variant="outlined"
                     :loading="loading"
                  ></v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-text-field
                     v-model="form.password"
                     :rules="validator.password"
                     placeholder="Kata sandi"
                     variant="outlined"
                     :loading="loading"
                     :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                     :type="showPassword ? 'text' : 'password'"
                     @click:append-inner="showPassword = !showPassword"
                  ></v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-btn
                     block
                     size="large"
                     type="submit"
                     :loading="loading"
                  >
                     Login
                  </v-btn>
               </v-col>
            </v-row>
         </v-form>
      </div>
   </v-container>
</template>

<script setup lang="ts">
definePageMeta({
   layout: 'blank'
})

type Login = {
   email: string|null
   password: string|null
}

const authStore = useAuthStore()
const loading = ref<boolean>(false)
const formRef = ref<any>()
const form = ref<Login>({
   email: null,
   password: null
})

const validator = computed(() => ({
   email: [
      (v: string) => !!v || 'Email harus diisi',
      (v: string) => /.+@.+\..+/.test(v) || 'Email tidak valid',
   ],
   password: [
      (v: string) => !!v || 'Kata sandi harus diisi',
   ]
}))

const showPassword = ref<boolean>(false)

const submit = async () => {
   if (!formRef.value.isValid) return

   loading.value = true
   await authStore.login(form.value as API.Request.Form.Login)
      .then(() => {
         navigateTo('/')
      })
      .finally(() => loading.value = false)
}
</script>