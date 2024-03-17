import { store } from "../../../redux";
import { actions as merchanStore } from "../data/merchantReducer";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { getBaseUrl } from "../../../utils";


export const fetchStoreOrders = async () => {
    try {
        const storeInfo = store.getState()[MERCHANT_STORE_NAME].storeInfo ?? JSON.parse(localStorage.getItem('storeInfo') ?? '') ;

        const url = getBaseUrl() + `order/store/list/?store=${storeInfo?.id}`
        const response = await fetch(url);
        const data = await response.json();
        store.dispatch(merchanStore.getStoreOrders(data));
        return data;
    } catch (error) {
        console.log(error)
    }
};

export const updateOrder = async (order: any) => {
    try {
        const url = getBaseUrl() + `order/update/${order.id}`;
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        store.dispatch(merchanStore.updateOrder(order));
        alert("Order status updated")
    } catch (error) {
        console.log(error)
        alert('Error deleting product');
    }
}