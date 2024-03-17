import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, Textarea, Select, SelectItem } from "@nextui-org/react";
import { createProduct, updateProduct } from "../actions/productActions";
import { useEffect, useState } from "react";

export default function AddEditProductModal(props: any) {
    const [product, setProduct] = useState(props.product);

    useEffect(() => { 
        setProduct(props.product)
     },[props]);


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
                        <form className="flex flex-1 flex-col gap-3" onSubmit={(e: any) =>{
                            e.preventDefault();
                            if (props?.product?.id) {
                                updateProduct(product);
                            } else {
                                createProduct(e);
                            }
                            props.onClose()
                        }}>
                            <div className="flex gap-3">
                                <Input
                                    autoFocus
                                    name="name"
                                    label="Name [EN]"
                                    isRequired
                                    placeholder="Product name in English"
                                    variant="bordered"
                                    defaultValue={props?.product?.name ?? ""}
                                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                                />
                                <Input
                                    name="name_ar"
                                    label="Name [AR]"
                                    placeholder="Product name in Arabic"
                                    variant="bordered"
                                    isRequired
                                    defaultValue={props?.product?.name_ar ?? ""}
                                    onChange={(e) => setProduct({ ...product, name_ar: e.target.value })}
                                />
                            </div>
                            <Textarea
                                name="description"
                                label="Description [EN]"
                                placeholder="Product description in English"
                                variant="bordered"
                                isRequired
                                defaultValue={props?.product?.description ?? ""}
                                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                            />
                            <Textarea
                                name="description_ar"
                                label="Description [AR]"
                                placeholder="Product description in Arabic"
                                variant="bordered"
                                isRequired
                                defaultValue={props?.product?.description_ar ?? ""}
                                onChange={(e) => setProduct({ ...product, description_ar: e.target.value })}
                            />
                            {/* <Select
                                        name="category"
                                        label="Select a category"
                                        variant="bordered"
                                        isRequired
                                    >
                                        <SelectItem key={"opt1"} value={"opt1"}>
                                            opt1
                                        </SelectItem>
                                    </Select> */}
                            <div className="flex gap-3">
                                <Input
                                    name="price"
                                    label="Price"
                                    placeholder="Product price in KWD"
                                    variant="bordered"
                                    type="number"
                                    isRequired
                                    defaultValue={props?.product?.price ?? 1}
                                    onChange={(e) => setProduct({ ...product, price: +e.target.value })}
                                />
                                <Input
                                    name="stock"
                                    label="Stock"
                                    placeholder="Stock quantity"
                                    variant="bordered"
                                    type="number"
                                    isRequired
                                    defaultValue={props?.product?.stock ?? 1}
                                    onChange={(e) => setProduct({ ...product, stock: +e.target.value })}
                                />
                            </div>
                            {props?.product?.id ? <></> : <input
                                name="images"
                                placeholder="Product images"
                                type="file"
                                multiple
                                accept="image/*"
                                className="border-medium border-neutral-200 rounded-lg p-2"
                            />}
                            <div className="flex flex-row gap-2 justify-end">
                                <Button color="danger" variant="flat" onPress={props.onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
