/* eslint-disable import/prefer-default-export */

import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST(request:Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const { NEXTROUTE_URL } = process.env;
  const data = await request.json();
  const {
    totalPrice, listingId, startDate, endDate, type, lang,
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
    success_url: `${NEXTROUTE_URL}/${lang}/success?type=${type}&id=${listingId}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}&lang=${lang}`,
    cancel_url: `${NEXTROUTE_URL}/${lang}/cancel`,
  });
  return new NextResponse(JSON.stringify({ url: session.url }));
}
