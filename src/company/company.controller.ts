import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { LoggingInterceptor } from "src/logging/logging.interceptor";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { DeleteCompanyDto } from "./dto/delete-company.dto";
import { FindCompanyDto } from "./dto/find-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@UseInterceptors(new LoggingInterceptor(new PrismaService()))
@Controller("companies")
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Get()
    findAll(@Query() findCompanyDto: FindCompanyDto) {
        return this.companyService.findAll(findCompanyDto);
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.companyService.findUniq({ id: +id });
    }

    @Patch(":id")
    update(
        @Param("id") id: string,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ) {
        return this.companyService.update({
            where: { id: +id },
            data: updateCompanyDto,
        });
    }

    @Delete("batch")
    removeMany(@Body() deleteCompanyDto: DeleteCompanyDto) {
        return this.companyService.removeMany({
            id: {
                in: deleteCompanyDto.ids,
            },
        });
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.companyService.remove({ id: +id });
    }
}
