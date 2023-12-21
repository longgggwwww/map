import { Prisma } from "@prisma/client";

export class CreateCategoryDto implements Prisma.CategoryCreateInput {
    name: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    places?: Prisma.PlaceCreateNestedManyWithoutCategoryInput;
    createdBy?: Prisma.UserCreateNestedOneWithoutCreatedCategoriesInput;
}
