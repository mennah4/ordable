import { useEffect } from "react";
import React from "react";
import { fetchStoreOrders, updateOrder } from "../actions/orderActions";
import SideNav from "../../../components/SideNav";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, ChipProps, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useAppSelector } from "../../../redux";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { ChevronDownIcon } from "../../../components/icons/ChevronDownIcon";

const StoreOrders = () => {

  const orders = useAppSelector((state) => state[MERCHANT_STORE_NAME].orders);
  const statusColorMap: Record<string, ChipProps["color"]> = {
    "pending": "warning",
    "processing": "primary",
    "completed": "success",
    "cancelled": "danger",
  };

  const orderStatuses = ["pending", "processing", "completed", "cancelled"];
  useEffect(() => {
    fetchStoreOrders()
  }, []);


  return (
    <>
      {/* <SideNav /> */}
      <div className="flex">


        <Table
          defaultSelectedKeys={["2"]}
          aria-label="Example static collection table"
        >
          <TableHeader>
            <TableColumn>ORDER_NO</TableColumn>
            <TableColumn>DATE</TableColumn>
            <TableColumn>AMOUNT</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>Address</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No orders found"}>
            {orders.map((order: any) => (
              <TableRow key={order.order_no}>
                <TableCell>{order.order_no}</TableCell>
                <TableCell>{order.created_at}</TableCell>
                <TableCell>{order.order_amount} KD</TableCell>
                <TableCell>{order.delivery_address}</TableCell>
                <TableCell>
                  <Dropdown>
                    <DropdownTrigger className="hidden sm:flex cursor-pointer">
                      <Chip endContent={<ChevronDownIcon className="text-small" />} className="capitalize" color={statusColorMap[order.order_status]} size="sm" variant="flat">
                        {order.order_status}
                      </Chip>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      aria-label="Table Columns"
                      closeOnSelect={true}
                      selectedKeys={order.order_status}
                      selectionMode="single"
                      onAction={(selected) => updateOrder({ ...order, order_status: selected })}
                    >
                      {orderStatuses.map((status: any) => (
                        <DropdownItem key={status} className="capitalize">
                          {status}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>

      </div>

    </>
  );
};

export default StoreOrders;