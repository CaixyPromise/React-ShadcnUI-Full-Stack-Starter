import React from "react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Plus, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDataTable } from "@/components/DataTable/DataTableContext";

interface DefaultButtonConfig {
    enable?: boolean;
    hidden?: boolean;
    label?: string;
    onClick?: () => void;
}

interface TableOperationsProps {
    extraButtons?: React.ReactNode[];
    defaultButtonConfig?: {
        new?: DefaultButtonConfig;
        refresh?: DefaultButtonConfig;
        settings?: Omit<DefaultButtonConfig, "onClick">;
    };
}

export const TableOperations: React.FC<TableOperationsProps> = ({ extraButtons = [], defaultButtonConfig = {} }) => {
    const { columns, visibleColumns, setVisibleColumns, fetchData, title } = useDataTable();

    const toggleColumn = (columnKey: string) => {
        setVisibleColumns(prev =>
            prev.includes(columnKey)
                ? prev.filter(key => key !== columnKey)
                : [...prev, columnKey]
        );
    };

    const displayColumns = columns.filter(col => !col.hideInTable);

    const renderButton = (variant: string, config: DefaultButtonConfig, defaultLabel: string, defaultIcon: React.ReactNode, defaultOnClick: () => void) => {
        if (config.hidden) return null;
        return (
            <Button variant={variant} onClick={config.onClick || defaultOnClick} disabled={config.enable === false}>
                {defaultIcon} {config.label || defaultLabel}
            </Button>
        );
    };

    return (
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>{title || "数据列表"}</CardTitle>
                <div className="space-x-2">
                    {renderButton(
                        "default",
                        defaultButtonConfig.new || {},
                        "新建",
                        <Plus className="mr-2 h-4 w-4" />,
                        () => {}
                    )}
                    {renderButton(
                        "outline",
                        defaultButtonConfig.refresh || {},
                        "刷新",
                        <RefreshCw className="mr-2 h-4 w-4" />,
                        () => fetchData()
                    )}
                    {!defaultButtonConfig.settings?.hidden && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" disabled={defaultButtonConfig.settings?.enable === false}>
                                    <Settings className="mr-2 h-4 w-4" /> {defaultButtonConfig.settings?.label || "列设置"}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {displayColumns.map(column => (
                                    <DropdownMenuCheckboxItem
                                        key={column.dataIndex as string}
                                        checked={visibleColumns.includes(column.dataIndex as string)}
                                        onCheckedChange={() => toggleColumn(column.dataIndex as string)}
                                    >
                                        {column.title}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                    {extraButtons.map((button, index) => (
                        <React.Fragment key={index}>{button}</React.Fragment>
                    ))}
                </div>
            </div>
        </CardHeader>
    );
};
