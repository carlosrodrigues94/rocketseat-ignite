import { NextApiRequest, NextApiResponse } from "next";

import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const buf = await buffer(req);

    const secret = req.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf,
        secret,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;
    const subscription = event.data.object as Stripe.Subscription;

    if (relevantEvents.has(type)) {
      try {
        console.log("Type que Chegou", type);

        switch (type) {
          /** Subscription created, Must create in FAUNA DB */
          case "customer.subscription.created":
          case "customer.subscription.updated":
            await saveSubscription({
              customerId: subscription.customer.toString(),
              subscriptionId: subscription.id,
              subscriptionExists: false,
            });
            break;

          /** Subscription updated, Must update in FAUNA DB */
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            await saveSubscription({
              customerId: subscription.customer.toString(),
              subscriptionId: subscription.id,
              subscriptionExists: true,
            });

            break;

          default:
            throw new Error("Unhandled event");
        }
      } catch (err) {
        return res.json({ error: `Webhook handler failed ${err.message}` });
      }
    }
    return res.status(200).json({ ok: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
