import React, { FC, memo } from "react";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { IFullOrder } from "../../../services/api/types";
import "./index.scss";

const OrderItem: FC<{ order: IFullOrder }> = ({ order }) => {
  return (
    <li className="order-item">
      <div className="order-item__title">
        <NavLink to={`${order.orderId}`}>Order №{order.orderId}</NavLink>
        <p className="order-item__title--status">status: Shipping</p>
      </div>
      <div className="order-item__device">
        <img
          className="order-item__device__img"
          src={order.productImg}
          alt="device"
        />
        <div className="order-item__device__info">
          <div>{order.productName}</div>
          <div>
            {order.price} {order.currency}
          </div>
        </div>
      </div>
    </li>
  );
};

export default memo(observer(OrderItem));
