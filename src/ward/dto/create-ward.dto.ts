import { Prisma } from '@prisma/client'

export class CreateWardDto implements Prisma.WardCreateInput {
  name: string
  code: string
  createdAt?: string | Date
  updatedAt?: string | Date
  district: Prisma.DistrictCreateNestedOneWithoutWardsInput
  persons?: Prisma.PersonalCreateNestedManyWithoutWardInput
}
