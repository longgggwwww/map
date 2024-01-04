import { Prisma } from '@prisma/client';

export class CreateSubcategoryDto implements Prisma.SubCategoryCreateInput {
  name: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  categories?: Prisma.CategoryCreateNestedManyWithoutSubCategoryInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutCreatedsubCategoriesInput;
}
