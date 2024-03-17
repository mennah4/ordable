import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { updateToken } from './userActions'
import { useAppSelector } from '../../redux'
import { CUSTOMER_STORE_NAME } from '../../redux/constants'

export const ProtectedRoute = () => {
    const [authTokens, setAuthTokens]: [any, Function] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens') ?? '') : null)
    const [loggedInCustomer, setLoggedInCustomer] = useState(() => localStorage.getItem('customerInfo') ? JSON.parse(localStorage.getItem('customerInfo') ?? '') : null)

    const isStore = window.location.pathname.includes('store');

    console.log("Protected route", authTokens, isStore)
    useEffect(() => {
        console.log("Will be triggered whenver the rout is loaded.")
        console.log('authtokens', authTokens)
        if(authTokens) {
            console.log("Auth tokens found. Refreshing the token to get the logged in user.")
            updateToken(authTokens);
            setAuthTokens(authTokens)
        }
    }, []);

    return (
        isStore? authTokens ? <Outlet /> : <Navigate to='/store/login' /> : loggedInCustomer ? <Outlet /> : <Navigate to="/products" />
    )
}
