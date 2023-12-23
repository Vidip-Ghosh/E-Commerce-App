import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const Product = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getApiData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const addToCart = (product) => {
    dispatch(add({ product }));
    console.log("ADDING ITEMS TO THE CART: ", product);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products &&
          products.map((prod) => (
            <div key={prod.id} className="bg-white p-4 shadow-md rounded-md">
              <img className="mx-auto mb-4 h-40 w-40 object-cover" src={prod.image} alt="" />
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">{prod.title}</p>
                <p className="text-gray-700">${prod.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => addToCart(prod)}
                type="button"
                className="mt-4 block w-full bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
