import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWoldReport, orderByIdReport } from 'src/reports';

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Conected by StoreReports');
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number) {
    const order = await this.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Not found order by ID ${orderId} `);
    }

    const docDefinition = orderByIdReport({ data: order as any });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getSvgChart() {
    const docDefinition = getHelloWoldReport({ name: 'Manuel Eduardo' });
    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
