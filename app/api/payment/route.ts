
import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (request:Request, res:Response) {
  
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    let data = await request.json();
    let totalPrice = data.totalPrice
    let id = data.listingId
    let startDate = data.startDate
    let endDate = data.endDate
    let type = data.type
    let lang = data.lang
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
              price_data: {
                currency: "USD",
                product_data: {
                  name: "turbo",
                  description: "Car Rental and more"
                },
                unit_amount: totalPrice * 100,
              },
              quantity: 1,
            },
          ],
      mode: 'payment',
       success_url:`http://localhost:3000/success?type=${type}&id=${id}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}&lang=${lang}`,
       cancel_url: 'http://localhost:3000'
    })
    return new NextResponse(JSON.stringify({ url: session.url }))
}