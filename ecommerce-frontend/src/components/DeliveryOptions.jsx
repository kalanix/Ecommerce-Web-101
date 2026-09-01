import axios from "axios";
import formatMoney from "../utils/money";
import dayjs from "dayjs";

function DeliveryOptions({deliveryOptions, cartItem, loadCart, }) {
  return (
    <>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "Free-Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = `${formatMoney(deliveryOption.priceCents)} -Shipping`;
        }
        const  updateDeliveryOption =async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`,{
            deliveryOptionId: deliveryOption.id
            })
          await loadCart();
        }
        return (
          <>
            <div key={deliveryOption.id} className="delivery-option" onClick={
              updateDeliveryOption
            }>
              <input
                type="radio"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd,MMMM,D",
                  )}
                </div>
                <div className="delivery-option-price">{priceString}</div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default DeliveryOptions;
