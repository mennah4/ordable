import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";
import { MailIcon } from "../../../components/icons/MailIcon";
import { LockIcon } from "../../../components/icons/LockIcon";
import { loginUser, registerUser } from "../../user/userActions";

export default function LoginModal(props: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} color={props.mode === 'login' ? "default" : "primary"} className="capitalize">{props.mode}</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.mode === 'login' ? "Log in" : "Sign up"}</ModalHeader>
                            <ModalBody>
                                <form onSubmit={(e: any) => {
                                    if (props.mode === 'login') {
                                        loginUser(e);
                                    } else {    
                                        registerUser(e);
                                    }
                                    onClose();
                                }}>

                                    {props.mode === 'signup' && (
                                        <input type="hidden" name="roles" value="CUSTOMER" />
                                    )}
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
                                    <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                            close
                                        </Button>
                                        <Button color="primary" type="submit">
                                            {props.mode}
                                        </Button>
                                    </ModalFooter>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
