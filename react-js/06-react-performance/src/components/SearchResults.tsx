import React, { useMemo } from "react";
import { IProduct } from "../types/product";
import { ProductItem } from "./ProductItem";
import { List, ListRowRenderer } from "react-virtualized";
type SearchResultsProps = {
  results: IProduct[];
  onAddToWishList: (id: number) => void;
};

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onAddToWishList,
}) => {
  /** Will calculate just when results are updated */
  const totalPrice = useMemo(() => {
    return results.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
  }, [results]);

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          key={key}
          product={results[index]}
          onAddToWishlist={onAddToWishList}
        />
      </div>
    );
  };

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300} // 300px
        rowHeight={30} // 30px
        width={900} // 900px
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />
    </div>
  );
};
