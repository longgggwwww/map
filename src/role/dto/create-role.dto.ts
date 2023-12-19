import { Prisma } from '@prisma/client';

export class CreateRoleDto implements Prisma.RoleCreateInput {
  name: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  permissions?: Prisma.PermissionCreateNestedManyWithoutRolesInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutCreatedRolesInput;
}
