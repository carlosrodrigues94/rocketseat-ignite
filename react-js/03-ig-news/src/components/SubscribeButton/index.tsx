import { AxiosResponse } from "axios";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import api from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = () => {
  const [session] = useSession();
  const handleSubscribe = async () => {
    if (!session) {
      signIn("github");
      return;
    }

    try {
      const response: AxiosResponse = await api.post("/subscribe");

      const { session } = response.data;

      console.log("Session id  => ", response.data);

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId: session });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButton}
    >
      Subscribe Now
    </button>
  );
};

export default SubscribeButton;
