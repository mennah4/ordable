import React from "react";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function randomId (length = 10) {
  return Math.random().toString(36).substring(2, length+2);
};

export function calculateTotalCartAmount(cartItems: any) {
  return cartItems.reduce((total: any, cartItem: any) => {
    const price = parseFloat(cartItem.product.price);
    return total + price * cartItem.quantity;
  }, 0);
}

export function getBaseUrl() {
  return (process.env.NODE_ENV === 'development')
    ? process.env.REACT_APP_BASE_URL_DEV
    : process.env.REACT_APP_BASE_URL_PROD;
}
