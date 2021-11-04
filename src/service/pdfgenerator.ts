import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import * as PDFDocument from 'pdfkit';
import { resolve as r } from 'path';
import { Event } from './eventEmmiter.service';

const myEvent = new Event();
@Injectable()
export class PDFGenerator {
  constructor() {}

  public async createInvoice(invoice, path) {
    const pdf = await new Promise((resolve) => {
      const doc = new PDFDocument({
        size: 'LETTER',
        margin: 50,
      });
      this.generateHeader(doc);
      this.generateCustomerInformation(doc, invoice);
      this.generateInvoiceTable(doc, invoice);
      doc.end();
      resolve(doc);

      doc.pipe(createWriteStream(r('pdfCreated') + '/' + Date.now() + '.pdf'));
    });

    return pdf;
  }
  generateHeader(doc) {
    doc
      .image('public/lvl7.png', 50, 45, {
        width: 50,
      })
      .fillColor('#444444')
      .fontSize(20)
      .text('Hussam Maher.', 110, 57)
      .fontSize(10)
      .text('kuwait str', 200, 65, { align: 'right' })
      .text('AlMaher Comp', 200, 80, { align: 'right' })
      .text('09938638584', 200, 100, { align: 'right' })
      .moveDown();
    this.generateHr(doc, 120);
  }
  generateCustomerInformation(doc, invoice) {
    const customer = invoice.customer;

    doc
      .fontSize(25)
      .text('invoice', 50, 160)
      .fontSize(10)
      .text(`Invoice Number: ${invoice.id}`, 50, 200)
      .text(`Invoice Date: ${new Date().toLocaleDateString('en-US')}`, 50, 215)
      .text(`Balance total: ${invoice.total}`, 50, 230)
      .text(customer.name, 300, 200)
      .text(customer.address, 300, 215)
      .text(customer.email, 300, 230)
      .moveDown();
  }
  generateTableRow(doc, y, c1, c2, c3, c4) {
    doc
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
      .text(c3, 280, y, { width: 90, align: 'right' })
      .text(c4, 370, y, { width: 90, align: 'right' });
  }
  generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
    this.generateTableRow(
      doc,
      invoiceTableTop,
      'unit id',
      'unit price',
      'quantity',
      'totalUnitPrice',
    );
    for (i = 0; i < invoice.invoiceItem.length; i++) {
      const item = invoice.invoiceItem[i];
      const position = invoiceTableTop + (i + 1) * 30;
      this.generateTableRow(
        doc,
        position,
        item.id,
        item.unitPrice,
        item.qty,
        item.totalUnitPrice,
      );
    }
  }
  generateHr(doc, y) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }
}
