import { jwtDecode } from "jwt-decode";
import { store } from "../../redux";
import { actions as customerStore } from "../customer/data/customerReducer";
import { actions as merchantStore } from "../merchant/data/merchantReducer";
import { getStoreInfo } from "../merchant/actions/storeActions";
import { createCart } from "../customer/actions/cartActions";


export const updateToken = async (authTokens: any) => {
    const refreshObject = authTokens.refresh;
    const  response = await fetch('http://127.0.0.1:8000/user/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'refresh': refreshObject })
    })


    if (response.status === 200) {
        console.log("Token updated successfully");
        const data = await response.json();
        const decodedRes: any = jwtDecode(data.access);
        console.log('decodedRes in updateToken', decodedRes)
        if(decodedRes?.roles?.name === 'CUSTOMER' || authTokens?.customer) {
            store.dispatch(customerStore.setCustomer(decodedRes));
        } else {
            store.dispatch(merchantStore.getMerchantInfo(decodedRes));
            localStorage.setItem('merchantInfo', JSON.stringify(decodedRes));
        }

        localStorage.setItem('authTokens', JSON.stringify(data));

        console.log("Customer/Store details added successfully to the local storage and redux store")
    } else {
        console.log("Error updating token")
    }

}

export const loginUser = async (e: any) => {
    try {
        e.preventDefault()
        const formData = new FormData(e.target)
        const response = await fetch('http://127.0.0.1:8000/user/token/', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        const decodedRes: any = jwtDecode(data.access)

        console.log("Update the data in the redux store and local storage based on the user role");
        
        if(decodedRes?.roles.name === 'CUSTOMER' || data?.customer) {
            store.dispatch(customerStore.setCustomer(decodedRes));
            // localStorage.setItem('customerInfo', JSON.stringify(decodedRes));
        } else {
            store.dispatch(merchantStore.getMerchantInfo(decodedRes));
            localStorage.setItem('merchantInfo', JSON.stringify(decodedRes));
            await getStoreInfo();
        }
        
        localStorage.setItem('authTokens', JSON.stringify(data))

    } catch (error) {
        alert('Something went wrong!')
        console.log(error)
    }
}

export const logoutUser = async (type: string) => {
    try {
        switch (type) {
            case 'customer':
                store.dispatch(customerStore.setCustomer(null));
                store.dispatch(customerStore.getCustomerCart(null));
                store.dispatch(customerStore.setSelectedProduct(null));
                localStorage.removeItem('cart');
                localStorage.removeItem('selectedProduct');
                localStorage.removeItem('customerInfo');
                break;
            case 'merchant':
                store.dispatch(merchantStore.getMerchantInfo(null));
                store.dispatch(merchantStore.getStoreInfo(null));
                localStorage.removeItem('merchantInfo');
                localStorage.removeItem('storeInfo');
                break;
            default:
                break;
        }

    } catch (error) {
        console.log(error)
    }
}

export const fetchUserRoles = async () => {
    try {
        let response = await fetch('http://127.0.0.1:8000/user/roles/')
        let data = await response.json()
        console.log("Fetch the available roles and store them in the local storage")
        localStorage.setItem('roles', JSON.stringify(data))
    } catch (error) {
        alert('Something went wrong!')
        console.log(error)
    }
}

export const registerUser = async (e: any) => {
    try {
        e.preventDefault()
        const formData = new FormData(e.target)
        let response = await fetch('http://127.0.0.1:8000/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({  
                "email": e.target.email.value,
                "password": e.target.password.value,
                "roles" : "CUSTOMER"
            }),
        })
        const data = await response.json();
        store.dispatch(customerStore.setCustomer(data.customer));
        if(data.access && data.refresh) {
            localStorage.setItem('authTokens', JSON.stringify(data))
        }
        await createCart(data);

    } catch (error) {
        alert('Something went wrong!')
        console.log(error)
    }
}
