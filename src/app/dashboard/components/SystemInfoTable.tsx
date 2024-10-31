import React from 'react';
import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {useMonitorContext} from "@/app/dashboard/context";


const functionComponent: React.FC = () =>
{
    const {serverInfo, loading} = useMonitorContext();

    return (
        <Table>
            <TableBody>
                {Object.entries(serverInfo?.sys || {}).map(([key, value]) => (
                    <TableRow key={key}>
                        <TableCell className="font-medium">{key}</TableCell>
                        <TableCell>{value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default functionComponent;
