import React from "react";
import { Input, Button } from "@nextui-org/react";
import { MailIcon } from "../../../components/icons/MailIcon";
import { LockIcon } from "../../../components/icons/LockIcon";
import { loginUser } from "../../user/userActions";
import { useNavigate } from 'react-router-dom';
import { getStoreInfo } from "../actions/storeActions";
import { fetchStoreProducts } from "../actions/productActions";

const MerchantLogin = () => {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <form className="md:w-1/3 max-w-sm" onSubmit={async (e: any) => {
        await loginUser(e);
        navigate('/store/products');
      }}>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
            Login to your ordable/ store
          </p>
        </div>
        <input type="hidden" name="roles" value="f47b3372-04a8-4c29-86be-f0a382372466" />

        <Input
          autoFocus
          className="mb-2"
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          name="email"
          required
        />
        <Input
          endContent={
            <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          className="mb-4"
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
          name="password"
          required
        />
        <div className="text-center w-full">
          <Button color="primary" type="submit" className="p-4 w-full">
            LOGIN
          </Button>
        </div>
      </form>
    </section>
  );
};

export default MerchantLogin;