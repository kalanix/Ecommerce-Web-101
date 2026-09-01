import { it, expect, describe, beforeEach, vi } from "vitest"; // vi is use to create mock(mock means create a fake fun that does not do anything) function in the test and we can check if the function is called or not and how many times it is called and with what arguments it is called
import { render, screen } from "@testing-library/react"; // render is use to render the component in the test(in fake web page) / screen is use to query the element in the test
import userEvent from '@testing-library/user-event' // useEvent is
import axios from "axios"; 
import Product from "./Product";

// we do here integration test a test for multiple piece of codes in here for format money loadcart and other in the product components

vi.mock('axios')// mock the axios module to prevent actual API calls during testing

describe("Product Component", () => {
  let product;
  let loadCart;

  beforeEach(()=>{
      product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };

     loadCart = vi.fn();
  }

  )


   
  it("display the product detail correctly", () => {
     render(<Product product={product} loadCart={loadCart} />);

    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByText("$10.90")).toBeInTheDocument();

    expect(screen.getByTestId("product-image")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );

    expect(screen.getByTestId("product-rating-stars")).toHaveAttribute(
      "src",
      "images/ratings/rating-45.png",
    );

    expect(screen.getByText("87")).toBeInTheDocument();
  });

  it('add product to a cart', async ()=>{
     render(<Product product={product} loadCart={loadCart} />);

    const user = userEvent.setup();
    await user.click(screen.getByTestId('add-to-cart-button'))
    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1
      }
    )
    expect(loadCart).toHaveBeenCalled();
  })
 
});
