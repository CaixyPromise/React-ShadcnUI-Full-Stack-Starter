// types.ts

import React, {ReactNode} from "react"

export type FieldType =
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'checkbox'
    | 'password'
    | 'textarea'
    | 'email'
    | 'url'
    | 'image'
    | 'link'
    | 'option'

export type RequestData<T> = {
    data: T[] | undefined
    success?: boolean
    total?: number
} & Record<string, unknown>

export type SortOrder = 'descend' | 'ascend' | null

export type DateTableColumnProps<T> = {
    title: string
    dataIndex: keyof T
    valueType?: FieldType
    render?: (text: any, record: T, index: number) => ReactNode
    width?: number
    hideInTable?: boolean
    hideInSearch?: boolean
    copyable?: boolean
    initialValue?: any
    searchType?: FieldType
    searchRender?: (form: any, fieldProps: any) => ReactNode
    sorter?: boolean
}

export type DataTableRequestAsyncFunction<T> = (
    params: {
        pageSize?: number
        current?: number
        keyword?: string
    },
    sort: Record<string, SortOrder>,
    filter: Record<string, (string | number)[] | null>
) => Promise<Partial<RequestData<T>>>
export type DataTableContextType<T> = {
    data: T[]
    setData: React.Dispatch<React.SetStateAction<T[]>>
    columns: DateTableColumnProps<T>[]
    visibleColumns: string[]
    setVisibleColumns: React.Dispatch<React.SetStateAction<string[]>>
    isLoading: boolean
    title?:string
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    pagination: {
        current: number
        pageSize: number
        total: number
    }
    setPagination: React.Dispatch<
        React.SetStateAction<{
            current: number
            pageSize: number
            total: number
        }>
    >
    fetchData: (params?: any) => Promise<void>
    sortConfig: Record<string, SortOrder>
    setSortConfig: React.Dispatch<React.SetStateAction<Record<string, SortOrder>>>
}

export type DataTableComponents<T> = {
    SearchArea?: ((context: DataTableContextType<T>) => React.ReactNode) | null
    TableOperations?: ((context: DataTableContextType<T>) => React.ReactNode) | null
    TableContent?: ((context: DataTableContextType<T>) => React.ReactNode) | null
    TableFooter?: ((context: DataTableContextType<T>) => React.ReactNode) | null
}



export type DataTableProps<T> = {
    columns: Array<DateTableColumnProps<T>>
    request?: DataTableRequestAsyncFunction<T>
    title?:string
    dataSource?: T[]
    initialPagination?: {
        current: number
        pageSize: number
        total: number
    }
    components?: {
        SearchArea?: ReactNode | null
        TableOperations?: ReactNode | null
        TableContent?: ReactNode | null
        TableFooter?: ReactNode | null
    }
    className?: string
    style?: React.CSSProperties
}
