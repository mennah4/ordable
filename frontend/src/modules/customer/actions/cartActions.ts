import { store } from "../../../redux";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";
import { actions as customerStore } from "../data/customerReducer";

export const createCart = async(reqData: any) => {
    try {     

         const response = await fetch('http://0.0.0.0:8000/cart/create/', {
            method: 'POST',
            body: JSON.stringify({
                "store_id": process.env.REACT_APP_STORE_ID,
                "customer_id": reqData?.customer?.user_id 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        store.dispatch(customerStore.getCustomerCart(data));
        localStorage.setItem('cart', JSON.stringify(data.cart))
    } catch (error) {
        console.log(error)
    }
}

export const getCustomerCart = async () => {
    try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens') ?? "");
        const customerId = authTokens?.customer?.user_id ?? store.getState()[CUSTOMER_STORE_NAME].customer.user_id ??  '';

        if(customerId) {
            const response = await fetch(`http://127.0.0.1:8000/cart/get/?customer_id=${customerId}`);
            let data;
            if(response.status !== 200) {
                // await createCart();
                return;
            } else {
                data = await response.json();
                store.dispatch(customerStore.getCustomerCart(data));
                localStorage.setItem('cart', JSON.stringify(data))
            }
            
        }
        
    } catch (error) {
        console.log(error)
    }
}
export const addToCart = async (productId: string, quantity: number) => {
    try {
        const localStorageCart = JSON.parse(localStorage.getItem('cart') ?? "");
        const cart = localStorageCart?.id ?? store.getState()[CUSTOMER_STORE_NAME].cart.id ??  '';
        const cartItem = {  
            "cart": cart,
            "product": productId,
            "quantity": quantity ?? 1
        }

        const response = await fetch(`http://127.0.0.1:8000/cart/add/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(cartItem),
        });
        getCustomerCart()
        alert('Cart item added successfully')
    } catch (error) {
        console.log(error)
        alert('Error deleting item');
    }
}

export const removeFromCart = async (itemId: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/cart/delete/${itemId}/`, {
            method: 'DELETE',
        });
        getCustomerCart()
        alert('Cart item deleted successfully')
    } catch (error) {
        console.log(error)
        alert('Error deleting item');
    }
}
