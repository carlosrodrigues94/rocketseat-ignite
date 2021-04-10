import { query as q } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

interface SaveSubscriptionProps {
  subscriptionId: string;
  customerId: string;
  subscriptionExists: boolean;
}

async function saveSubscription(data: SaveSubscriptionProps) {
  const { subscriptionExists, customerId, subscriptionId } = data;

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price: subscription.items.data[0].price.id,
  };

  if (!subscriptionExists) {
    console.log("VAI CRIAR NO FAUNA");
    await fauna.query(q.Create("subscriptions", { data: subscriptionData }));
    return;
  }

  console.log("VAI ATUALIZAR NO FAUNA");
  await fauna.query(
    q.Replace(
      q.Select(
        "ref",
        q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
      ),
      { data: subscriptionData }
    )
  );
}

export { saveSubscription };
