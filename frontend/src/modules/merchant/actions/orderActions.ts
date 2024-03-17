import { store } from "../../../redux";
import { actions as merchanStore } from "../data/merchantReducer";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";


export const fetchStoreOrders = async () => {
    try {
        const storeInfo = store.getState()[MERCHANT_STORE_NAME].storeInfo ?? JSON.parse(localStorage.getItem('storeInfo') ?? '') ;

        const response = await fetch(`http://127.0.0.1:8000/order/store/list/?store=${storeInfo?.id}`);
        const data = await response.json();
        store.dispatch(merchanStore.getStoreOrders(data));
        return data;
    } catch (error) {
        console.log(error)
    }
};

export const updateOrder = async (order: any) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/order/update/${order.id}`, {
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