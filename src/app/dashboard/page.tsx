"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"

import {useMonitorContext} from "@/app/dashboard/context";
import ResourceChart, {ResourceDataProps} from "@/app/dashboard/components/ResourceChart";
import SystemInfoTable from "@/app/dashboard/components/SystemInfoTable";
import JvmInfoTable from "@/app/dashboard/components/JvmInfoTable";
import MemoryInfoTable from "@/app/dashboard/components/MemoryInfoTable";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

// Mock data based on the provided JSON
const mockData = {
    cpu: {
        cpuNum: 16,
        total: 1627000,
        sys: 0.49,
        used: 0.2,
        wait: 0,
        free: 99.02,
        cpuName: "Intel(R) Core(TM) i7-10875H CPU @ 2.30GHz"
    },
    mem: {
        total: 15.84,
        used: 15.03,
        free: 0.81,
        usage: 94.89
    },
    jvm: {
        currentUsageMem: 603.5,
        maxMemSize: 3604,
        free: 211.83,
        usedHeapMemory: 391.67,
        nonHeapMemory: 103.15,
        usage: 64.9
    },
    sys: {
        computerName: "SyuYoung",
        computerIp: "172.20.96.1",
        userDir: "D:\\Code File\\Java\\Springboot-inital-template",
        osName: "Windows 10",
        osArch: "amd64"
    },
    sysFiles: [
        {
            dirName: "C:\\",
            sysTypeName: "NTFS",
            typeName: "Local Fixed Disk (C:)",
            total: "931.5 GB",
            free: "768.0 GB",
            used: "163.5 GB",
            usage: 17.55
        },
        {
            dirName: "D:\\",
            sysTypeName: "NTFS",
            typeName: "Local Fixed Disk (D:)",
            total: "100.0 GB",
            free: "24.3 GB",
            used: "75.7 GB",
            usage: 75.72
        },
        {
            dirName: "E:\\",
            sysTypeName: "NTFS",
            typeName: "Local Fixed Disk (E:)",
            total: "376.8 GB",
            free: "141.1 GB",
            used: "235.7 GB",
            usage: 62.55
        }
    ]
}

const DiskUsage = ({ disk }) => (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>{disk.dirName}</CardTitle>
        </CardHeader>
        <CardContent>
            <div>
                <Progress value={disk.usage} className="w-full"/>
            </div>
            <div className="mt-2 text-sm">
                Used: {disk.used} ({disk.usage.toFixed(2)}%) / Total: {disk.total}
            </div>
        </CardContent>
    </Card>
);

export default function SystemMonitor() {
    const {serverInfo, loading} = useMonitorContext();
    const cpuData:ResourceDataProps = {
        data: [
            { name: 'CPU用户使用率', value: serverInfo?.cpu?.userUsageRate },
            { name: 'CPU系统使用率', value: serverInfo?.cpu?.sysUsageRate },
            { name: 'CPU当前等待率', value: serverInfo?.cpu?.waitRate },
            { name: 'CPU当前空闲率', value: serverInfo?.cpu?.freeRate },
        ],
        title: "CPU使用情况"
    }
    const memData: ResourceDataProps = {
        data: [
            { name: '已用内存', value: serverInfo?.mem?.usage },
            { name: '剩余内存', value: 100 - (serverInfo?.mem?.usage || 100) }
        ],
        description: [
            { name: '内存总量', value: serverInfo?.mem?.total, prefix: "GB" },
        ],
        title: "内存使用情况"
    }

    const jvmData: ResourceDataProps = {
        data: [
            { name: 'JVM内存使用率', value: serverInfo?.jvm?.usage, }
        ],
        description: [
            { name: 'JVM当前使用内存', value: serverInfo?.jvm?.currentUsageMem, prefix: "MB" },
            { name: 'JVM最大可用内存总数', value: serverInfo?.jvm?.maxMemSize, prefix: "MB" },
            { name: '已使用堆内存', value: serverInfo?.jvm?.usedHeapMemory, prefix: "MB" },
            { name: '非堆内存使用', value: serverInfo?.jvm?.nonHeapMemory, prefix: "MB" },
        ],
        title: "JVM使用情况"
    }


    return (

        <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <ResourceChart data={cpuData} />
                <ResourceChart data={memData} />
                <ResourceChart data={jvmData} />
            </div>
            <TooltipProvider>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serverInfo.sysFiles?.map((disk, index) => (
                        <DiskUsage key={index} disk={disk} />
                    ))}
                </div>
            </TooltipProvider>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full">
                        <Tabs defaultValue="system" className="w-full">
                            <TabsList className="flex w-full">
                                <TabsTrigger value="system" className="flex-1">系统信息</TabsTrigger>
                                <TabsTrigger value="jvm" className="flex-1">JVM信息</TabsTrigger>
                                <TabsTrigger value="Memory" className="flex-1">Memory内存信息</TabsTrigger>
                            </TabsList>
                            <TabsContent value="system">
                                <SystemInfoTable />
                            </TabsContent>
                            <TabsContent value="jvm">
                                <JvmInfoTable />
                            </TabsContent>
                            <TabsContent value="Memory">
                                <MemoryInfoTable />
                            </TabsContent>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>


    )
}
