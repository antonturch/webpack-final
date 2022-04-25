import React, { FC, memo } from "react";
import { observer } from "mobx-react-lite";
import { IProduct } from "../../../services/api/types";
import "./index.scss";

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="product">
      <img className="product__img" src={product.img} alt="product" />
      <div className="product__info">
        <h3>{product.name}</h3>
        <div>
          {product.price} {product.currency}
        </div>
        <div>{product.description}</div>
      </div>
    </div>
  );
};

export default memo(observer(ProductItem));
