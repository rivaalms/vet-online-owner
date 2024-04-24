export const useNavigationMenu = () => {
   return [
      {
         title: 'Beranda',
         icon: 'mdi-home',
         to: '/'
      },
      {
         title: 'Konsultasi Baru',
         icon: 'mdi-plus',
         to: '/consultation'
      },
      {
         title: 'Pengguna',
         icon: 'mdi-account-circle',
         to: '/user'
      }
   ]
}