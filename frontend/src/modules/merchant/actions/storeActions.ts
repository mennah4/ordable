import { store } from "../../../redux";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { getBaseUrl } from "../../../utils";
import { actions as merchanStore } from "../data/merchantReducer";

export const getStoreInfo = async () => {
    try {
        console.log("Fetching store info")
        const merchantInfo = store.getState()[MERCHANT_STORE_NAME].merchantInfo ?? JSON.parse(localStorage.getItem('merchantInfo') ?? '') ;

        const url = getBaseUrl() + `store/info/?user_id=${merchantInfo?.user_id}`
        const response = await fetch(url);
        const data = await response.json();
        store.dispatch(merchanStore.getStoreInfo(data));
        localStorage.setItem('storeInfo', JSON.stringify(data));
    } catch (error) {
        console.log(error)
    }
};
