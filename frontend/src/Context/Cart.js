import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
const CartProvider = (props) => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    let checkLocalCart = localStorage.getItem("cart");
    if (checkLocalCart) setCart(JSON.parse(checkLocalCart));
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
const useCart = () => useContext(CartContext);
export { CartProvider, useCart };
