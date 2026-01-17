export type IFormPersonalInfoType = {
  name: string
  national_id: string
  date_of_birth: Date
  gender: GenderEnum
  address: {
    main: string
    city: string
    state: string
    country: string
  }
  phone: string
  email: string
}
enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}
