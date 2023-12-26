import { Prisma } from '@prisma/client'

export class CreatePositionDto implements Prisma.PositionCreateInput {
  name: string
  code: string
  createdAt?: string | Date
  updatedAt?: string | Date
  department: Prisma.DepartmentCreateNestedOneWithoutPositionsInput
  persons?: Prisma.PersonalCreateNestedManyWithoutPositionInput
}
