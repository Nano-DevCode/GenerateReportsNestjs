import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import type { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  async getOrderReport(
    @Res() response: Response,
    @Param('orderId', ParseIntPipe) orderId: string,
  ) {
    const pdfDoc = await this.storeReportsService.getOrderByIdReport(+orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }

  @Get('svgs-charts')
  async getSvgChart(
    @Res() response: Response,
    @Param('orderId', ParseIntPipe) orderId: string,
  ) {
    const pdfDoc = await this.storeReportsService.getSvgChart();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Svg-Chart-Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
