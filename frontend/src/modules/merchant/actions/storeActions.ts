import { store } from "../../../redux";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { actions as merchanStore } from "../data/merchantReducer";

export const getStoreInfo = async () => {
    try {
        console.log("Fetching store info")
        const merchantInfo = store.getState()[MERCHANT_STORE_NAME].merchantInfo ?? JSON.parse(localStorage.getItem('merchantInfo') ?? '') ;
        const response = await fetch(`http://127.0.0.1:8000/store/info/?user_id=${merchantInfo?.user_id}`);
        const data = await response.json();
        store.dispatch(merchanStore.getStoreInfo(data));
        localStorage.setItem('storeInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
};
