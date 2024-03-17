import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import Products from './modules/merchant/pages/Products';
import StoreOrders from './modules/merchant/pages/Orders';
import { Provider } from 'react-redux';
import { store } from './redux';
import SideNav from './components/SideNav';
import NavBar from './components/NavBar';
import StoreFront from './modules/customer/pages/StoreFront';
import CustomerOrders from './modules/customer/pages/Orders';
import CheckoutPage from './modules/customer/pages/Checkout';
import ProductDetails from './modules/customer/pages/ProductDetails';
import { ProtectedRoute } from './modules/user/ProtectedRoute';
import MerchantLogin from './modules/merchant/pages/MerchantLogin';
import { useEffect } from 'react';
import { fetchUserRoles } from './modules/user/userActions';

const App = () => {
  const navigate = useNavigate();
  const isStore = ['/store/products', '/store/orders'].includes(window.location.pathname)

  useEffect(() => {
    fetchUserRoles()
  },[])

  return (
    <Provider store={store}>
      <NextUIProvider navigate={navigate}>
        <Toaster />
        <div>

        {isStore ? <SideNav /> : <></>}

          <div className="max-w-screen h-screen overflow-auto flex">
            <div className={`w-full h-full ${isStore ? "sm:ml-64" : ""}`}>
              <div className="">
                {['/store/login', '/store/products', '/store/orders'].includes(window.location.pathname) ?
                  <div className="p-4">
                    <Routes>
                      <Route path="/store/login" element={<MerchantLogin />} />
                      <Route element={<ProtectedRoute />}>
                        <Route path='/store/orders' element={<StoreOrders />} />
                        <Route path='/store/products' element={<Products />} />
                      </Route>
                    </Routes>
                  </div>
                  : <>
                    <NavBar />

                    <Routes>
                      {['/products', '/', ''].map(path => <Route path="/products" element={<StoreFront/>} />) }
                      <Route path="/product/details" element={<ProductDetails />} />
                      <Route element={<ProtectedRoute />}>
                        <Route path='/customer/checkout' element={<CheckoutPage />} />
                        <Route path='/customer/orders' element={<CustomerOrders />} />
                      </Route>
                    </Routes>

                  </>}
              </div>
            </div>
          </div>
        </div>
      </NextUIProvider>
    </Provider>
  );
}
export default App;



