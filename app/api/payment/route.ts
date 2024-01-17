/* eslint-disable import/prefer-default-export */

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const data = await request.json();
  const {
    totalPrice, id, startDate, endDate, type, lang,
  } = data;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'turbo',
            description: 'Car Rental and more',
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/${lang}/success?type=${type}&id=${id}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}&lang=${lang}`,
    cancel_url: `http://localhost:3000/${lang}/cancel`,
  });
  return new NextResponse(JSON.stringify({ url: session.url }));
}
