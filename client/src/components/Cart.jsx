import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.cart);

  const removeFromCart = async (product) => {
    dispatch(remove(product.product.id));
    console.log("Removing from Cart: ", product.product.id);
  };

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe("your_stripe_public_key_here");
    const body = {
      products: products
    };
    const headers = {
      "Content-Type": "application/json"
    };
    const response = await fetch("http://localhost:3000/api/create-checkout-session", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id
    });
    if (result.error) {
      console.log("result.error");
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((prod, index) => (
          <li key={index} className="bg-gray-800 p-4 rounded shadow">
            <img className="mx-auto mb-4 h-40 w-40 object-cover" src={prod.product.image} alt="Product Image" />
            <div className="text-center text-white">
              <p className="text-lg font-semibold mb-2">{prod.product.title}</p>
              <p>${prod.product.price !== undefined ? prod.product.price : "N/A"}</p>
            </div>
            <button
              onClick={() => removeFromCart(prod)}
              type="button"
              className="mt-4 block w-full bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-red-300"
            >
              Remove From Cart
            </button>
          </li>
        ))}
      </ul>
      <button onClick={makePayment} className="mt-8 block w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-green-300">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
