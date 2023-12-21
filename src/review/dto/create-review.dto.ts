import { Prisma } from '@prisma/client'

export class CreateReviewDto implements Prisma.ReviewCreateInput {
    content: string
    stars: number
    photos?: string[] | Prisma.ReviewCreatephotosInput
    createdAt?: string | Date
    updatedAt?: string | Date
    user: Prisma.UserCreateNestedOneWithoutReviewsInput
    place: Prisma.PlaceCreateNestedOneWithoutReviewsInput
}
