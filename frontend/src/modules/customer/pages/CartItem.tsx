import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import { removeFromCart } from "../actions/cartActions";

export default function CartItem(props: any) {
    const item = props.item;
    return (

        <div key={item.id} className="flex items-center justify-between px-2 py-3 border-b border-gray-200">

            <div className="flex items-center mb-2">
                <div className="flex cursor-pointer h-16 w-16 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                    <img src={item?.product?.images[0]} alt="..." className="w-full h-full rounded-full" />


                </div>
                <div className="flex-grow ml-4">
                    <p className="text-xs">{item?.product?.name}</p>
                    <p className="text-xs">{item?.product?.name_ar}</p>
                </div>

            </div>
            <div className="flex items-center justify-end gap-3">
                <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-700">{item?.quantity}</p>
                    <p className="mx-2 text-xs text-gray-700">x</p>
                    <p className="text-sm font-medium text-gray-700">{item.product?.price}</p>
                </div>
                <p className="text-sm font-medium text-gray-700">{+item.product?.price * item?.quantity} KD</p>
            </div>
            {props.isCart && 
            <div onClick={()=> removeFromCart(item.id)}    className="cursor-pointer flex items-center justify-center h-8 w-8 rounded bg-red-600 font-medium text-white">
                <DeleteIcon />
            </div>}
        </div>

    )
}