"use client"
import React from 'react';
import {ServerInfoProvider, useMonitorContext} from "@/app/dashboard/context";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import PageContainer from "@/layout/PageContainer";

interface LayoutProps
{
    children: React.ReactNode
}

const BasicProvider: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <ServerInfoProvider>
            {children}
        </ServerInfoProvider>
    )
}

const Layout: React.FC<LayoutProps> = ({children}) =>
{
    const { loading} = useMonitorContext();
    console.log(loading)
    return (
        <BasicProvider>
            <PageContainer isLoading={loading}>
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="flex w-full">
                        <TabsTrigger value="overview" className="flex-1">概览</TabsTrigger>
                        <TabsTrigger value="details" className="flex-1">详情</TabsTrigger>
                    </TabsList>
                    {children}
                </Tabs>
            </PageContainer>
        </BasicProvider>
    )
}

export default Layout;
