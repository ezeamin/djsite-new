'use server';

import { generateEventMailData } from './utils';
import nodemailer from 'nodemailer';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

const { MAIL_USER, MAIL_PASS, MAIL_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  tls: {
    rejectUnauthorized: false,
  },
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export const sendPingMail = async ({
  formData,
  price,
  distance,
  discount,
  ip,
  userAgent,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
  discount: number | null;
  ip: string | null;
  userAgent: string | null;
}) => {
  const mailContent = {
    from: MAIL_USER,
    to: MAIL_USER,
    subject: 'Nuevo presupuesto!!1! 🥳😎',
    html: generateEventMailData({
      formData,
      price,
      distance,
      discount,
      ip,
      userAgent,
    }),
  };

  try {
    await transporter.sendMail(mailContent);
    console.log('NEW BUDGET --- Mail sent! 🥳😎');
  } catch (error) {
    console.error('\nNEW BUDGET --- Error sending mail 🥺', error, `\n`);
  }
};
