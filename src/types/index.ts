export interface Person {
  id?: string,
  title: string,
  firstName: string,
  lastName: string,
  birthDay: any,
  nationality?: string,
  citizenId?: string,
  gender?: string,
  phoneCountryCode: string,
  phoneNumber: string,
  passport?: string,
  expectedSalary: string,
}

export interface CountryCode {
  name: string,
  dial_code: string,
  code: string
}