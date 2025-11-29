import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import {
  getEmploymentLetter,
  getHelloWoldReport,
  getEmploymentLetterById,
  getCountryReport,
} from 'src/reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to the database');
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWoldReport({ name: 'Manuel Eduardo' });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const docDefinition = getEmploymentLetterById({
      employerName: 'Manuel Eduardo',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries(countrie?: string) {
    const countries = await this.countries.findMany({
      where: {
        local_name: countrie ? countrie : { not: null },
      },
    });

    const docDefinition = getCountryReport({
      title: 'Countries Report',
      subTitle: 'List of countries',
      countries: countries,
    });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
