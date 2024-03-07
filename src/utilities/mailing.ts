'use server';

import { generateEventMailData } from './utils';
import nodemailer from 'nodemailer';

import { BudgetFormSchema } from '@/forms/schemas/budgetFormSchema';

const { MAIL_USER, MAIL_PASS, MAIL_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  //   tls: {
  //     rejectUnauthorized: false,
  //     ciphers: 'SSLv3',
  //   },
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) console.error('Email config is NOT correct 🥺', err);
  console.log('Email config is correct! 🥳😎');
});

export const sendPingMail = async ({
  formData,
  price,
  distance,
  ip,
  userAgent,
}: {
  formData: BudgetFormSchema;
  price: number;
  distance: number;
  ip: string | null;
  userAgent: string | null;
}) => {
  const mailContent = {
    from: MAIL_USER,
    to: MAIL_USER,
    subject: 'Nuevo presupuesto!!1! 🥳😎',
    html: generateEventMailData({ formData, price, distance, ip, userAgent }),
  };

  try {
    await transporter.sendMail(mailContent);
    console.log('Mail sent! 🥳😎');
  } catch (error) {
    console.error('\nError sending mail 🥺', error, `\n`);
  }
};
