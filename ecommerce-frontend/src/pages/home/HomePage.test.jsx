import { it, describe, beforeEach, vi, expect } from "vitest"; // vi is use to create mock(mock means create a fake fun that does not do anything) function in the test and we can check if the function is called or not and how many times it is called and with what arguments it is called
import { render, screen, within } from "@testing-library/react"; // render is use to render the component in the test(in fake web page) / screen is use to query the element in the test
import { MemoryRouter } from "react-router";
import axios from "axios";
import HomePage from "./HomePage";

vi.mock("axios");

describe("Homepage component", () => {
  let loadCart;

  beforeEach(() => {
    loadCart = vi.fn();

    axios.get.mockImplementation((urlPath) => {
      if (urlPath === "/api/products") {
        return Promise.resolve({
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
            {
              id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
              image: "images/products/intermediate-composite-basketball.jpg",
              name: "Intermediate Size Basketball",
              rating: {
                stars: 4,
                count: 127,
              },
              priceCents: 2095,
              keywords: ["sports", "basketballs"],
            },
          ],
        });
      }
    });
  });
  it("display the products correct", async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>,
    );
    // lets find by test id

    const productContainers = await screen.findAllByTestId("product-container");
    expect(productContainers.length).toBe(2);

    expect(
    within(productContainers[0]).getByText(
      "Black and Gray Athletic Cotton Socks - 6 Pairs",
    )
).toBeInTheDocument();

    expect(
    within(productContainers[1]).getByText(
      "Intermediate Size Basketball",
    )
).toBeInTheDocument();

  });
});
