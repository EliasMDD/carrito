import { useContext } from "react";
import { ContextCart } from "../context/ContextCart";

export const CartModal = ({ closeModal }) => {
  const { cartShopping, setCartShopping } = useContext(ContextCart);

  const removeItem = (itemId) => {
    // Encuentra el producto en el carrito
    const productToRemove = cartShopping.find((item) => item.id === itemId);
    
    // Si el producto tiene una cantidad mayor a 1, disminuye la cantidad en uno
    if (productToRemove.quantity > 1) {
      const updatedCart = cartShopping.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartShopping(updatedCart);
    } else {
      // Si el producto tiene una cantidad de 1, elimina el producto del carrito
      const updatedCart = cartShopping.filter((item) => item.id !== itemId);
      setCartShopping(updatedCart);
    }
  };

  const totalPrice = cartShopping.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  const handleModalClick = (event) => {
    if (event.target !== event.currentTarget) return;
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50" onClick={handleModalClick}>
      <div className="modal bg-white rounded-lg shadow-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
        <span className="close absolute top-0 right-0 p-2 cursor-pointer" onClick={closeModal}>
          &times;
        </span>
        <h2 className="text-2xl font-semibold mb-4">Carrito de Compras</h2>
        {cartShopping.map((product) => (
          <div key={product.id} className="mb-4 flex items-center">
            <img src={product.image} alt={product.title} className="w-16 h-16 mr-4" />
            <div>
              <h3 className="font-semibold">{product.title}</h3>
              <p className="text-gray-700">Precio: ${product.price}</p>
              <p className="text-gray-700">Cantidad: {product.quantity}</p>
              <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => removeItem(product.id)}>Eliminar</button>
            </div>
          </div>
        ))}
        {cartShopping.length > 0 && (
          <div className="text-right">
            <p className="text-xl font-semibold">Total: ${totalPrice}</p>
          </div>
        )}
        {cartShopping.length === 0 && (
          <p>No hay productos en el carrito.</p>
        )}
      </div>
    </div>
  );
};





















