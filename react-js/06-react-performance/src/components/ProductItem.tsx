import { memo, useState } from "react";
import dynamic from "next/dynamic";

import lodash from "lodash";

import { AddProductToWishlistProps } from "./AddProductToWishList";
import { IProduct } from "../types/product";

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  async () => {
    const component = await import("./AddProductToWishList");

    return component.AddProductToWishlist;
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: IProduct;
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return lodash.isEqual(prevProps.product, nextProps.product);
  }
);

// export const ProductItem = memo(
//   ProductItemComponent,
//   (prevProps, nextProps) => {
//     return Object.is(prevProps.product, nextProps.product);
//   }
// );
