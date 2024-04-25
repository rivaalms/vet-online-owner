export const useNavigationMenu = () => {
   return [
      {
         title: 'Beranda',
         icon: 'mdi-home',
         to: '/'
      },
      {
         title: 'Hewan Peliharaan',
         icon: 'mdi-paw',
         to: '/pets'
      },
      {
         title: 'Pengguna',
         icon: 'mdi-account-circle',
         to: '/user'
      }
   ]
}