<template>
   <v-container class="h-100 d-flex justify-center align-center">
      <div class="w-100">
         <p class="mb-8 font-weight-bold text-primary text-center">
            Vet Online
         </p>

         <h1 class="">Selamat datang</h1>
         <p class="text-grey">Silakan login untuk melanjutkan</p>

         <v-form class="mt-8" @submit.prevent="submit">
            <v-row>
               <v-col cols="12">
                  <v-text-field
                     v-model="form.email"
                     placeholder="Email"
                     type="email"
                     variant="outlined"
                  ></v-text-field>
               </v-col>
               <v-col cols="12">
                  <v-text-field
                     v-model="form.password"
                     placeholder="Kata sandi"
                     variant="outlined"
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

const form = ref<Login>({
   email: null,
   password: null
})

const showPassword = ref<boolean>(false)

const submit = async () => {
   console.log(form.value)
}
</script>