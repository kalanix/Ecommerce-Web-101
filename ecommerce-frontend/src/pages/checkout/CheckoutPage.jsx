import axios from "axios";
import { useState, useEffect } from "react";
import "./CheckoutPage.css";
import "./checkout-header.css";
import CheckoutHeader from "../../components/checkoutHeader";
import PaymentSummary from "../../components/PaymentSummary";
import OrderSumamry from "../../components/OrderSummary";

function CheckoutPage({ cart, loadCart}) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {

    const fetchCheckoutData = async () => {
      const [deliveryRes, paymentRes] = await Promise.all([
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
        axios.get("/api/payment-summary")
      ])
      setDeliveryOptions(deliveryRes.data)
      setPaymentSummary(paymentRes.data)
    }

    fetchCheckoutData()

  }, [cart]);

  
  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSumamry cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;
