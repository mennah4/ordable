import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User as UserComponent,
  Pagination,
  Selection,
  Tooltip,
  SortDescriptor,
  useDisclosure
} from "@nextui-org/react";
import { deleteProduct, fetchStoreProducts } from "../actions/productActions";
import { useAppSelector } from "../../../redux";
import { MERCHANT_STORE_NAME } from "../../../redux/constants";
import { EditIcon } from "../../../components/icons/EditIcon";
import { DeleteIcon } from "../../../components/icons/DeleteIcon";
import SearchIcon from "../../../components/icons/SearchIcon";
import { ChevronDownIcon } from "../../../components/icons/ChevronDownIcon";
import { capitalize } from "../../../utils";
import { PlusIcon } from "../../../components/icons/PlusIcon";
import AddEditProductModal from "./AddEditProductModal";
const INITIAL_VISIBLE_COLUMNS = ["name", "price", "stock", "category", "actions"];
const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NAME", uid: "name", sortable: true},
  {name: "NAME[AR]", uid: "name[ar]", sortable: true},
  {name: "PRICE", uid: "price"},
  {name: "STOCK", uid: "stock"},
  {name: "ACTIONS", uid: "actions"},
];

const Products = () => {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [selectesProduct, setSelectedProduct] = React.useState(null);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
      column: "age",
      direction: "ascending",
    });
  
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const products = useAppSelector((state) => state[MERCHANT_STORE_NAME].products) ?? [];
    type Product = typeof products[0];
  
    const [page, setPage] = React.useState(1);
  
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        fetchStoreProducts();
    }, []);

    const handleDelete = (id: any) => {
      if (window.confirm('Are you sure you want to delete this item?')) {
        deleteProduct(id);
      }
    };

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
    
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
      }, [visibleColumns]);
    
      const filteredItems = React.useMemo(() => {
        let filteredProducts = [...products];
    
        if (hasSearchFilter) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(filterValue.toLowerCase()),
          );
        }
    
        return filteredProducts;
      }, [products, filterValue, statusFilter]);
    
      const pages = Math.ceil(filteredItems.length / rowsPerPage);
    
      const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return filteredItems.slice(start, end);
      }, [page, filteredItems, rowsPerPage]);
    
      const sortedItems = React.useMemo(() => {
        return [...items].sort((a: Product, b: Product) => {
          const first = a[sortDescriptor.column as keyof Product] as number;
          const second = b[sortDescriptor.column as keyof Product] as number;
          const cmp = first < second ? -1 : first > second ? 1 : 0;
    
          return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
      }, [sortDescriptor, items]);
    
      const renderCell = React.useCallback((product: Product, columnKey: React.Key) => {
        const cellValue = product[columnKey as keyof Product];
    
        switch (columnKey) {
          case "name":
            return (
              <UserComponent
                avatarProps={{ radius: "lg", src: product.images[0] }}
                description={product.name}
                name={product.name_ar}
              >
                {product.name_ar}
              </UserComponent>
            );
          case "price":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue} KD</p>
              </div>
            );
          case "stock":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            );
          case "category":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-small capitalize">{cellValue}</p>
              </div>
            );
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => {
                  setSelectedProduct(product)
                  onOpen()
                  }}>
                  <EditIcon />
                </span>
                <span onClick={() => handleDelete(product.id)} className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </div>)
          default:
            return cellValue;
        }
      }, []);
    
      const onNextPage = React.useCallback(() => {
        if (page < pages) {
          setPage(page + 1);
        }
      }, [page, pages]);
    
      const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
          setPage(page - 1);
        }
      }, [page]);
    
      const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
      }, []);
    
      const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
    
      const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
      }, [])
    
      const topContent = React.useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                      Columns
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button onPress={onOpen} color="primary" endContent={<PlusIcon />}>
                  Add New
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small">Total {products.length} products</span>
              <label className="flex items-center text-default-400 text-small">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        );
      }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onSearchChange,
        onRowsPerPageChange,
        products.length,
        hasSearchFilter,
      ]);


      const bottomContent = React.useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                Previous
              </Button>
              <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                Next
              </Button>
            </div>
          </div>
        );
      }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
    
    
      return (
        <>
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[512px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No products found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
    
          <AddEditProductModal isOpen={isOpen} onClose={() => {
            onClose()
            setSelectedProduct(null)
          }} product={selectesProduct} setSelectedProduct={setSelectedProduct}/>
        </>
      );
};

export default Products;