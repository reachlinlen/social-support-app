export type IFormFamilyFinancialInfoType = {
  marital_status: MaritalStatus | ''
  dependents: {
    relationship: string
    name: string
  }[]
  employment_status: EmploymentStatus | ''
  monthly_income: number
  housing_status: HousingStatus | ''
}

enum MaritalStatus {
  married = 'married',
  single = 'single',
  divorced = 'divorced',
}

enum EmploymentStatus {
  employed = 'employed',
  unemployed = 'unemployed',
}

enum HousingStatus {
  owned = 'owned',
  rented = 'rented',
  others = 'others',
}
