import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../paymentForm";

const STRAPI_PUBLIC_KEY =
  "pk_test_51LCh8vBKVMeveUGr1FH8Rrf3fNIf9yJPopY7NViJ43DZ6FYH6mNRqYnTqzptCVoCodkOx3l0BcJ0Y7VgtbYRPaCZ00ZEDcd8oH";

const stripeTestPromise = loadStripe(STRAPI_PUBLIC_KEY as string);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;
