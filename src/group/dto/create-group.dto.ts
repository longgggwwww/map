import { Prisma } from '@prisma/client';

export class CreateGroupDto implements Prisma.PermissionGroupCreateInput {
  name: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  permissions?: Prisma.PermissionCreateNestedManyWithoutGroupInput;
}
