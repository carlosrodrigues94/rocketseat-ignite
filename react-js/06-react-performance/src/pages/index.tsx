import { useCallback, useMemo, memo, useState, FormEvent } from "react";

import { AddProductToWishlist } from "../components/AddProductToWishList";
import { ProductItem } from "../components/ProductItem";
import { SearchResults } from "../components/SearchResults";
import { IProduct } from "../types/product";

type Results = {
  data: IProduct[];
  totalPrice: number;
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Results>({ data: [], totalPrice: 0 });

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputValue.trim()) return;

    const response = await fetch(
      `http://localhost:3333/products?q=${inputValue}`
    );

    const data: IProduct[] = await response.json();

    const totalPrice = data.reduce((total: number, product) => {
      return total + product.price;
    }, 0);

    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const products = data.map((product) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    setResults({ data: products, totalPrice });

    console.log("data => ", data);
  };

  const addToWithList = useCallback(async (id: number) => {
    console.log("id do withlist => ", id);
  }, []);

  return (
    <div className="App">
      <h1>Search</h1>

      <form action="" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Procurar"
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
        />

        <button type="submit">Procurar</button>
      </form>

      <SearchResults results={results.data} onAddToWishList={addToWithList} />
    </div>
  );
}
