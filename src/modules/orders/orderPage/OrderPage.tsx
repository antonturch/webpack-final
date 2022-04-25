import React, { FC, useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../../index";
import OrderItem from "@modules/orders/orderItem/";
import { IFullOrder } from "../../../services/api/types";
import "./index.scss";

const OrderPage: FC = ({}) => {
  const orderId = Number(useParams().orderId);
  const { store } = useContext(Context);
  let order: IFullOrder | undefined = store.orders.find(
    (el) => el.orderId === orderId
  );
  if (!order) {
    store.getOrders();
    order = store.orders.find((el) => el.orderId === orderId);
  }

  const payBtnHandler = () => {
    if (order) {
      localStorage.setItem("productId", order.productId.toString());
    }
  };

  return (
    <div className="order-page">
      <h1 className="order-page__title">Order №{orderId}</h1>
      <OrderItem
        order={
          order
            ? order
            : {
                orderId: 1,
                productId: 2,
                productName: "string",
                productImg: "string",
                price: 1,
                currency: "string",
              }
        }
      />
      <NavLink
        className="order-page__pay-btn"
        to={`/orders/${orderId.toString()}/payment`}
        onClick={payBtnHandler}
      >
        Pay
      </NavLink>
    </div>
  );
};

export default observer(OrderPage);
