import { Button, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import VisaIcon from '../../../components/icons/VisaIcon';
import ApplePayIcon from '../../../components/icons/ApplePayIcon';
import CashIcon from '../../../components/icons/CashIcon';
import { getCustomerCart } from '../actions/cartActions';
import { CUSTOMER_STORE_NAME } from '../../../redux/constants';
import { useAppSelector } from '../../../redux';
import MasterCardIcon from '../../../components/icons/MasterCardIcon';
import { createOrder } from '../actions/orderActions';
import { calculateTotalCartAmount, randomId } from '../../../utils';
import CartItem from './CartItem';

const options = [
    { label: 'Visa', type: 'online',  value: <VisaIcon /> },
    { label: 'Apple pay', type: 'online', value: <ApplePayIcon /> },
    { label: 'Cash', type: 'oash', value: <CashIcon /> },
    { label: 'Master Cart', type: 'online', value: <MasterCardIcon /> },
];

const SHIPPING_FEE = 5;

const CheckoutPage = () => {
    const cart = useAppSelector((state) => state[CUSTOMER_STORE_NAME].cart);
    const [addres, setAddress] = useState('Kuwait city');
    const [paymentType, setPaymentType] = useState<{ label: string; type: string; value: JSX.Element }>();

    useEffect(() => {
        getCustomerCart()
    }, []);



    return (
        <div className="max-w-screen-lg mx-auto flex flex-1">
            <div className="w-1/2 border-r border-gray-200">
                <div className="p-4">
                    <h2 className="font-medium text-lg mb-4">Cart Details</h2>
                    {cart?.cart_items && cart?.cart_items?.map((item: any, i: number) => (
                        <CartItem item={item}/>

                    ))}
                    <div className="border-t pt-4 border-neutral-200 flex items-center justify-between mb-6">
                        <p className="text-gray-500 text-sm">Subtotal</p>
                        <p className="font-medium text-sm">{calculateTotalCartAmount(cart?.cart_items ?? [])} KD</p>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <p className="text-gray-500 text-sm">Shipping</p>
                        <p className="font-medium text-sm">{SHIPPING_FEE} KD</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-gray-500 text-sm">Total</p>
                        <p className="font-medium text-sm">{calculateTotalCartAmount(cart?.cart_items ?? []) + SHIPPING_FEE} KD</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-4">
                <h6 className="font-medium text-lg mb-4 border-b pb-4">Delivery address</h6>
                <Input
                    autoFocus
                    name="name"
                    label="Address"
                    isRequired
                    placeholder="Delivery Address"
                    variant="bordered"
                    defaultValue="Kuwait city"
                    onChange={(e) => setAddress(e.target.value)}
                />

                <div className="my-4">
                    <label className="block text-sm font-medium mb-2">Payment Type</label>
                    <div className="flex justify-around gap-3 items-center">
                        {options.map((option) => (
                            <button
                                className="px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                                onClick={() => setPaymentType(option)}
                            >
                                <div className='px-4 border-2  border-neutral-200 rounded-lg'>
                                    {option.value}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <button
                  onClick={() => createOrder({
                    order_no: randomId(),
                    products: cart?.cart_items.map((item: any) => (item.product.id)) ?? [],
                    customer: cart?.customer_id,
                    store: cart?.store_id,
                    order_amount: calculateTotalCartAmount(cart?.cart_items ?? []),
                    created_at: new Date().toISOString(),
                    delivery_address: addres,
                    payment_type: paymentType?.type ?? 'cash'
                  })}
                  className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                >
                  Place order
                </button>
            </div>
        </div>)
}; export default CheckoutPage;