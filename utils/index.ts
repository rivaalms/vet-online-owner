export { $api } from './api/index'
export { login, logout, me } from './api/auth'
export {
   getPets,
   showPet,
   createPet,
   updatePet,
   deletePet
} from './api/pets'
export {
   getConsultations,
   showConsultation,
   createConsultation,
   getConsultationChats
} from './api/consultations'
export {
   getExaminations
} from './api/examinations'
export {
   getVeterinarians
} from './api/veterinarians'