import React, { useEffect, useState } from "react";
import { fetchCustomerOrders } from "../actions/orderActions";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ChipProps, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAppSelector } from "../../../redux";
import { CUSTOMER_STORE_NAME } from "../../../redux/constants";

export default function CustomerOrders() {

    useEffect(() => {
        fetchCustomerOrders();
    }, []); 
    const orders = useAppSelector((state) => state[CUSTOMER_STORE_NAME].orders);

    const statusColorMap: Record<string, ChipProps["color"]> = {
        "pending": "warning",
        "processing": "primary",
        "completed": "success",
        "cancelled": "danger",
    };

    return (
        <div className="max-w-screen-lg mx-auto p-4">
        <Table
            defaultSelectedKeys={["2"]}
            aria-label="Example static collection table"
        >
            <TableHeader>
                <TableColumn>ORDER_NO</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
                <TableColumn>ADDRESS</TableColumn>
                <TableColumn>STATUS</TableColumn>
            </TableHeader>
            <TableBody>
                {orders.map((order: any) => (
                    <TableRow key={order.order_no}>
                        <TableCell>{order.order_no}</TableCell>
                        <TableCell>{order.created_at}</TableCell>
                        <TableCell>{order.order_amount} KD</TableCell>
                        <TableCell>{order.delivery_address}</TableCell>
                        <TableCell>
                            <Chip className="capitalize" color={statusColorMap[order.order_status]} size="sm" variant="flat">
                                {order.order_status}
                            </Chip>
                        </TableCell>
                    </TableRow>

                ))}
            </TableBody>
        </Table>
        </div>
    );
}
