import { store } from "../../../redux";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";
import { getBaseUrl } from "../../../utils";
import { actions as customerStore } from "../data/customerReducer";

export const createOrder = async (order: any) => {
    try {
        const url = getBaseUrl() + 'order/create/';
        const response = await fetch(url, {
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

        const url = getBaseUrl() + `order/customer/list/?customer=${customerId}`
        const response = await fetch(url);
        const data = await response.json();
        store.dispatch(customerStore.getCustomerOrders(data));

    } catch (error) {
        console.log(error)
    }
};

