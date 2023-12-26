import { Prisma } from '@prisma/client';

export class CreateUserDto implements Prisma.UserCreateInput {
  username: string;
  password: string;
  type?: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  personal?: Prisma.PersonalCreateNestedOneWithoutUserInput;
  createdRoles?: Prisma.RoleCreateNestedManyWithoutCreatedByInput;
  createdPermissions?: Prisma.PermissionCreateNestedManyWithoutCreatedByInput;
  log?: Prisma.LogCreateNestedManyWithoutUserInput;
}
