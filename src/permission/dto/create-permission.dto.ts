import { Prisma } from '@prisma/client'

export class CreatePermissionDto implements Prisma.PermissionCreateInput {
  code: string
  label: string
  createdAt?: string | Date
  updatedAt?: string | Date
  group: Prisma.PermissionGroupCreateNestedOneWithoutPermissionsInput
  roles?: Prisma.RoleCreateNestedManyWithoutPermissionsInput
  createdBy?: Prisma.UserCreateNestedOneWithoutCreatedPermissionsInput
}
