import { store } from "../../../redux";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";
import { actions as customerStore } from "../data/customerReducer";

export const createOrder = async (order: any) => {
    try {
        console.log(order)
        const response = await fetch('http://0.0.0.0:8000/order/create/', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        alert('Order created successfully')
    } catch (error) {
        console.log(error)
    }
}

export const fetchCustomerOrders = async () => {
    try {
        const authTokens = JSON.parse(localStorage.getItem('authTokens') ?? "");
        const customerId = authTokens?.customer?.user_id ?? store.getState()[CUSTOMER_STORE_NAME].customer.user_id ??  '';

        const response = await fetch(`http://127.0.0.1:8000/order/customer/list/?customer=${customerId}`);
        const data = await response.json();
        store.dispatch(customerStore.getCustomerOrders(data));

    } catch (error) {
        console.log(error)
    }
};

