// import { Injectable } from '@nestjs/common';

// import nodemailer, { SendMailOptions } from 'nodemailer';

// @Injectable()
// export class MailService {
//   transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: 'onlinesuport.forsite@gmail.com',
//       pass: 'heeypfcketsnmexf',
//     },
//     logger: true,
//   });
//   constructor() {}

//   async sendMail(message: SendMailOptions) {
//     const info = await this.transporter.sendMail(message);
//     return info;
//   }
// }
