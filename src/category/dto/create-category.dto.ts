import { Prisma } from '@prisma/client';

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
  name: string;
  color?: string;
  icon?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  subCategory?: Prisma.SubCategoryCreateNestedOneWithoutCategoriesInput;
  places?: Prisma.PlaceCreateNestedManyWithoutCategoryInput;
  createdBy?: Prisma.UserCreateNestedOneWithoutCreatedCategoriesInput;
}
