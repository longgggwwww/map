import { Prisma } from '@prisma/client'

export class CreateCompanyDto implements Prisma.CompanyCreateInput {
    name: string
    email: string
    phone: string
    tax: string
    createdAt?: string | Date
    updatedAt?: string | Date
    departments?: Prisma.DepartmentCreateNestedManyWithoutCompanyInput
}
