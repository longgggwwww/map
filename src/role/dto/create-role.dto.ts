import { Prisma } from '@prisma/client'

export class CreateRoleDto implements Prisma.RoleCreateInput {
    name: string
    code: string
    createdAt?: string | Date
    updatedAt?: string | Date
    permissions?: Prisma.PermissionCreateNestedManyWithoutRolesInput
    users?: Prisma.UserCreateNestedManyWithoutRolesInput
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedRolesInput
}
