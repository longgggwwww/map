import { Prisma } from '@prisma/client';

export class CreateDepartmentDto implements Prisma.DepartmentCreateInput {
  name: string;
  code: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  company: Prisma.CompanyCreateNestedOneWithoutDepartmentsInput;
  positions?: Prisma.PositionCreateNestedManyWithoutDepartmentInput;
}
