import { Session } from "next-auth";

export interface ActiveSubscription {
  ref: { [key: string]: any };
  ts: number;
  data: {
    id: string;
    userId: { [key: string]: any };
    status: "active" | "canceled";
    price: string;
  };
}

export interface ISession extends Session {
  activeSubscription: ActiveSubscription | null;
}
