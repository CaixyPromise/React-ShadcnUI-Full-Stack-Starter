// DataTable/index.tsx
"use client"

import React from "react"
import { DataTableProvider } from "./DataTableContext"

import { DataTableProps } from "./types"
import {SearchArea} from "@/components/DataTable/components/SearchArea";
import {TableOperations} from "@/components/DataTable/components/TableOperations";
import {TableContent} from "@/components/DataTable/components/TableContent";
import {TableFooter} from "@/components/DataTable/components/TableFooter";
import {Card} from "@/components/ui/card";

const DataTable = <T extends Record<string, any>>({
    columns,
    request,
    dataSource,
    title,
    initialPagination,
    components,
    className,
    style,
}: DataTableProps<T>) => {
    return (
        <DataTableProvider
            columns={columns}
            request={request}
            dataSource={dataSource}
            title={title}
            initialPagination={initialPagination}
        >
            <div className={className} style={style}>
                {components?.SearchArea !== null && (components?.SearchArea || <SearchArea />)}
                <div className="mt-4">
                    <Card>
                        {components?.TableOperations !== null && (components?.TableOperations || <TableOperations />)}
                        {components?.TableContent !== null && (components?.TableContent || <TableContent />)}
                        {components?.TableFooter !== null && (components?.TableFooter || <TableFooter />)}
                    </Card>
                </div>
            </div>
        </DataTableProvider>
    )
}

export default DataTable
