import { Prisma } from '@prisma/client'

export class CreateDistrictDto implements Prisma.DistrictCreateInput {
  name: string
  code: string
  createdAt?: string | Date
  updatedAt?: string | Date
  province: Prisma.ProvinceCreateNestedOneWithoutDistrictsInput
  wards?: Prisma.WardCreateNestedManyWithoutDistrictInput
}
