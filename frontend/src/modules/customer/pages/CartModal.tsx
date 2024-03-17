import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, Textarea, Select, SelectItem, Link } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import ShopingCartIcon from "../../../components/icons/ShoppingCartIcon";
import { getCustomerCart } from "../actions/cartActions";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";
import { useAppSelector } from "../../../redux";
import { calculateTotalCartAmount } from "../../../utils";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

export default function CartModal(props: any) {
  const navigate = useNavigate();

  useEffect(() => {
    getCustomerCart()
  }, []);

  const cart = useAppSelector((state) => state[CUSTOMER_STORE_NAME].cart);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onOpenChange={props.onOpenChange}
        onClose={props.onClose}
        placement="top-center"
        classNames={{
          wrapper: 'justify-end',
        }}
      >
        <ModalContent className="h-full align-end !mx-0 rounded-r-none">
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <ModalBody>
            {!cart || cart?.cart_items?.length === 0 ? (
              <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                <ShopingCartIcon className="h-16" />
                <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
              </div>
            ) : (
              <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                <ul className="flex-grow overflow-auto py-4">
                  {cart?.cart_items?.map((item: any, i: number) => {
                    return (
                      <CartItem isCart={true} item={item}/>
                    );
                  })}
                </ul>
                <div className="py-4 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                    <p>Shipping</p>
                    <p className="text-right">Calculated at checkout</p>
                  </div>
                  <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                    <p>Total </p>
                    <p className="text-right">{calculateTotalCartAmount(cart?.cart_items ?? [])} KD</p>

                  </div>
                </div>
                <button onClick={() => navigate('/customer/checkout')}
                  className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
