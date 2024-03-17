import { store } from "../../../redux";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";
import { getBaseUrl } from "../../../utils";
import { actions as customerStore } from "../data/customerReducer";

export const createCart = async(reqData: any) => {
    try {     
        const url = getBaseUrl() + 'cart/create/'

         const response = await fetch(url, {
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
            const url = getBaseUrl() + `cart/get/?customer_id=${customerId}`
            const response = await fetch(url);
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
        const url = 'https://ordable-1.onrender.com/' + 'cart/add/'
        const response = await fetch(url, {
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
        const url = getBaseUrl() + `cart/delete/${itemId}/`
        const response = await fetch(url, {
            method: 'DELETE',
        });
        getCustomerCart()
        alert('Cart item deleted successfully')
    } catch (error) {
        console.log(error)
        alert('Error deleting item');
    }
}
