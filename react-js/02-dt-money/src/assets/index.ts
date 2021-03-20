import close from "./close.svg";
import income from "./income.svg";
import logo from "./logo.svg";
import outcome from "./outcome.svg";
import total from "./total.svg";
import vector from "./vector.svg";

interface SvgImages {
  [key: string]: string;
  close: string;
  outcome: string;
  income: string;
  vector: string;
  logo: string;
  total: string;
}

export const svgImages: SvgImages = {
  close: close,
  outcome: outcome,
  income: income,
  vector: vector,
  logo: logo,
  total: total,
};
