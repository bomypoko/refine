import React from "react";
import {
    IResourceComponentsProps,
    GetManyResponse,
    useMany,
} from "@pankod/refine-core";
import { useTable } from "@pankod/refine-react-table";
import { ColumnDef, flexRender } from "@tanstack/react-table";
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    MarkdownField,
} from "@pankod/refine-mantine";

import { ScrollArea, Table, Pagination, Group } from "@mantine/core";

import { ColumnSorter } from "../../components/table/ColumnSorter";
import { ColumnFilter } from "../../components/table/ColumnFilter";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const columns = React.useMemo<ColumnDef<any>[]>(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "Id",
                enableColumnFilter: false,
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Name",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "material",
                accessorKey: "material",
                header: "Material",
                meta: {
                    filterOperator: "contains",
                },
            },
            {
                id: "description",
                accessorKey: "description",
                header: "Description",
                meta: {
                    filterOperator: "contains",
                },
                cell: function render({ getValue }) {
                    return (
                        <MarkdownField
                            value={getValue<string>()?.slice(0, 80) + "..."}
                        />
                    );
                },
            },
            {
                id: "price",
                accessorKey: "price",
                header: "Price",
                enableColumnFilter: false,
            },
            {
                id: "category",
                header: "Category",
                accessorKey: "category.id",
                enableSorting: false,
                enableColumnFilter: false,
                cell: function render({ getValue, table }) {
                    const meta = table.options.meta as {
                        categoryData: GetManyResponse;
                    };

                    const category = meta.categoryData?.data?.find(
                        (item) => item.id === getValue<any>(),
                    );

                    return category?.title ?? "Loading...";
                },
            },
            {
                id: "actions",
                accessorKey: "id",
                header: "Actions",
                enableSorting: false,
                enableColumnFilter: false,
                cell: function render({ getValue }) {
                    return (
                        <Group spacing="xs" noWrap>
                            <ShowButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                            <EditButton
                                hideText
                                recordItemId={getValue() as string}
                            />
                        </Group>
                    );
                },
            },
        ],
        [],
    );

    const {
        getHeaderGroups,
        getRowModel,
        setOptions,
        refineCore: {
            setCurrent,
            pageCount,
            current,
            tableQueryResult: { data: tableData },
        },
    } = useTable({
        columns,
    });

    const { data: categoryData } = useMany({
        resource: "categories",
        ids: tableData?.data?.map((item) => item?.category?.id) ?? [],
        queryOptions: {
            enabled: !!tableData?.data,
        },
    });

    setOptions((prev) => ({
        ...prev,
        meta: {
            ...prev.meta,
            categoryData,
        },
    }));

    return (
        <List>
            <ScrollArea>
                <Table highlightOnHover>
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id}>
                                            <Group spacing="xs">
                                                {!header.isPlaceholder &&
                                                    flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                <ColumnSorter
                                                    column={header.column}
                                                />
                                                <ColumnFilter
                                                    column={header.column}
                                                />
                                            </Group>
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </ScrollArea>
            <br />
            <Pagination
                position="right"
                total={pageCount}
                page={current}
                onChange={setCurrent}
            />
        </List>
    );
};
