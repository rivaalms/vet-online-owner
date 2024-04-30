type Navigation = {
   title: string
   icon: string
   to: string
}

export const useNavigationMenu = (): Navigation[] => {
   return [
      {
         title: 'Beranda',
         icon: 'mdi-home',
         to: '/'
      },
      {
         title: 'Riwayat Konsultasi',
         icon: 'mdi-clipboard-pulse',
         to: '/consultations'
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