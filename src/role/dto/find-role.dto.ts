import { Prisma } from '@prisma/client';

export class FindRoleDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.RoleWhereUniqueInput;
  where?: Prisma.RoleWhereInput;
  orderBy?: Prisma.RoleOrderByWithRelationInput;
}
