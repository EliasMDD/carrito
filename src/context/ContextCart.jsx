import { createContext, useState } from "react";

export const ContextCart = createContext()


export const ProviderContext = ({ children }) => {

    const [cartShopping, setCartShopping] = useState([])

    const addProductCart = (product) => {
        //SI EL PRODUCTO EXISTE O NO EXISTE DENTRO DE NUESTRO CARRUTO
        const existProduct = cartShopping.find((item) => item.id === product.id)
        if (existProduct) {
            //CUANDO EL PRODUCTO EXISTE
            const newProduct = {
                ...product,
                quantity: existProduct.quantity + 1
            }
            //BUSCAM,OS EL PRODUCTO EN EL CARRITO Y LO REEMPLAZAMOS CON SUS NUEVOS VALORES,
            //SI NO EXISTE DEVOLVEMOS EL CARRITO TAL CUAL
            const updateCarrito = cartShopping.map((item)=>(
                item.id === existProduct.id ? newProduct : item
            ))
            setCartShopping(updateCarrito)
        } else {
            //CUANDO EL PRODUCTO NO EXISTE
            const newProduct = {
                ...product,
                quantity: 1
            }
            setCartShopping([...cartShopping, newProduct])
        }
    }
    
    const removeProductCart = (productId) => {
        const updatedCart = cartShopping.filter((item) => item.id !== productId);
        setCartShopping(updatedCart);
    };


    return (
        <ContextCart.Provider value={{cartShopping, addProductCart, removeProductCart, setCartShopping }}>
            {children}
        </ContextCart.Provider>
    )
}

