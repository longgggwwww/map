import { PartialType } from '@nestjs/mapped-types'
import { Prisma } from '@prisma/client'

class CreatePersonalDto implements Prisma.PersonalCreateInput {
    email?: string
    phone?: string
    fullName?: string
    birthday?: string | Date
    gender?: boolean
    address?: string
    image?: string
    createdAt?: string | Date
    updatedAt?: string | Date
    user: Prisma.UserCreateNestedOneWithoutPersonalInput
    position?: Prisma.PositionCreateNestedOneWithoutPersonsInput
    ward?: Prisma.WardCreateNestedOneWithoutPersonsInput
}

export class UpdateMyProfileDto extends PartialType(CreatePersonalDto) {}
