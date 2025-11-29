import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import type { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  hello(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hola-Mundo';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() response: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('employment-letter/:employmentId')
  async employmentLetterById(
    @Res() response: Response,
    @Param('employmentId') employmentId: string,
  ) {
    const pdfDoc =
      await this.basicReportsService.employmentLetterById(+employmentId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment-Letter';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('countries')
  async getContriesRepot(
    @Res() response: Response,
    @Query('countrie') countrie?: string,
  ) {
    const pdfDoc = await this.basicReportsService.getCountries(countrie);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
