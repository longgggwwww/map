import { Prisma } from '@user/prisma/client';

export class CreatePermissionDto implements Prisma.PermissionCreateInput {
    name: string;
    code: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    group: Prisma.GroupCreateNestedOneWithoutPermissionsInput;
    roles?: Prisma.RoleCreateNestedManyWithoutPermissionsInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutPermissionInput;
}
