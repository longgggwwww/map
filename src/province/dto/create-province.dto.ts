import { Prisma } from '@prisma/client'

export class CreateProvinceDto implements Prisma.ProvinceCreateInput {
  name: string
  code: string
  createdAt?: string | Date
  updatedAt?: string | Date
  districts?: Prisma.DistrictCreateNestedManyWithoutProvinceInput
}
