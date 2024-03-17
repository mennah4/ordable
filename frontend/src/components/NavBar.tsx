import { Link, useDisclosure } from "@nextui-org/react";
import Search from "../modules/customer/pages/Search";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@nextui-org/react";
import ShoppingCartIcon from "./icons/ShoppingCartIcon";
import CartModal from "../modules/customer/pages/CartModal";
import { useAppSelector } from "../redux";
import { CUSTOMER_STORE_NAME } from "../redux/constants";
import LoginModal from "../modules/customer/pages/LoginModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { logoutUser } from "../modules/user/userActions";

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const customer = useAppSelector((state) => state[CUSTOMER_STORE_NAME].customer)
    const cart = useAppSelector((state) => state[CUSTOMER_STORE_NAME].cart);
    const storeInfo = {
        name: process.env.REACT_APP_STORE_NAME,
        id: process.env.REACT_APP_STORE_ID
    };

    useEffect(() => {
        console.log("customer in navbar", customer)
    }, [customer])

    return (
        <Navbar isBordered className="">
            <NavbarBrand>
                <a href="/products" className="font-bold text-blue-600 text-inherit">{storeInfo.name}</a>
            </NavbarBrand>
            <NavbarContent justify="end">
                {!customer &&
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <LoginModal mode="login" />
                        </NavbarItem>
                        <NavbarItem>
                            <LoginModal mode="signup" />
                        </NavbarItem>
                    </>}

                {customer &&
                    <>
                        <Button onPress={() => navigate('/customer/orders')} color="primary" variant="bordered">
                            My orders
                        </Button>
                        <Button onPress={() => {
                            logoutUser('customer')
                            navigate('/products');
                        }} 
                            color="primary" variant="bordered">
                            Logout
                        </Button>
                        
                        <div onClick={onOpen} className="relative flex cursor-pointer h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">

                            <ShoppingCartIcon />

                            <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
                                <p className="flex items-center justify-center">{cart?.cart_items?.length ?? 0}</p>
                            </div>
                        </div>
                    </>}
            </NavbarContent>
            {customer && <CartModal isOpen={isOpen} onClose={onClose} />}
        </Navbar>
    );
}

