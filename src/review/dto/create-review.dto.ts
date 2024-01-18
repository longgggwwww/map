import { Prisma } from '@prisma/client';

export class CreateReviewDto implements Prisma.ReviewCreateInput {
  content: string;
  stars: number;
  photos?: Prisma.ReviewCreatephotosInput | string[];
  status?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  place: Prisma.PlaceCreateNestedOneWithoutReviewsInput;
  user: Prisma.UserCreateNestedOneWithoutReviewsInput;
}
