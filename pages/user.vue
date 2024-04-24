<template>
   <v-container class="d-flex flex-column gap-8">
      <div class="d-flex gap-4">
         <v-avatar
            color="primary"
            size="x-large"
         >
            J
         </v-avatar>

         <div class="">
            <p class="font-weight-medium">{{ user?.name }}</p>
            <p class="text-grey-darken-1">{{ user?.email }}</p>
         </div>
      </div>

      <v-divider></v-divider>

      <v-btn
         block
         color="red-darken-2"
         prepend-icon="mdi-logout"
         :loading="isLogoutting"
         @click.stop="attemptLogout"
      >
         Logout
      </v-btn>
   </v-container>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { getUser: user, logout } = authStore

const isLogoutting = ref<boolean>(false)

const attemptLogout = async () => {
   isLogoutting.value = true
   await logout()
      .then(() => {
         navigateTo('/login')
      })
      .finally(() => isLogoutting.value = false)
}
</script>