
import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST (request:Request, res:Response) {
  
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
    let data = await request.json();
    console.log(data)
    let totalPrice = data.totalPrice
    let id = data.listingId
    let startDate = data.startDate
    let endDate = data.endDate
    const session = await stripe.checkout.sessions.create({
        // line_items: [
        //     {
        //         price: priceId,
        //         quantity: 1
        //     }
        // ],
        line_items: [
            {
              price_data: {
                currency: "USD",
                product_data: {
                  name: "turbo",
                  description: "Unlimited AI Generations"
                },
                unit_amount: totalPrice * 100,
              },
              quantity: 1,
            },
          ],
      mode: 'payment',
      //http://localhost:3000/success?q=rental&id=656b210d9ebb5a5fc694c8e8&startDate=2024-01-07T23:00:00.000Z&endDate=2024-01-09T23:00:00.000Z&totalPrice=120
       success_url:`http://localhost:3000/success?type=rental&id=${id}&startDate=${startDate}&endDate=${endDate}&totalPrice=${totalPrice}`,
       cancel_url: 'http://localhost:3000'
    })
    // if (session.url) {
    //   router.push(session.url);
    // }
    // res.redirected(303, session.url);
    return new NextResponse(JSON.stringify({ url: session.url }))
    // return NextResponse.json(session.url)
}