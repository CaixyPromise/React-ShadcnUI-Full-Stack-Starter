
// 创建上下文context
import React, {createContext, useState, useContext, useEffect} from 'react'
import useAsyncHandler from "@/hooks/useAsyncHandler";
import {getMonitorInfoUsingGet1} from "@/api/serverController";

const MonitorContext = createContext<{
    serverInfo: API.ServerInfo,
    setServerInfo: React.Dispatch<React.SetStateAction<API.ServerInfo>>
    loading: boolean,
}>({
    loading: false,
    serverInfo: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setServerInfo: () => {}
})

export const ServerInfoProvider = ({ children }: { children: React.ReactNode }) =>
{
    const [serverInfo, setServerInfo] = useState<API.ServerInfo>({})
    const [queryData, loading] = useAsyncHandler<API.ServerInfo>();

    const fetchData = async () => {
        return await queryData(async () => {
            const {data, code} = await getMonitorInfoUsingGet1();
            return data as API.ServerInfo
        }, [])
    }

    useEffect(() => {
        fetchData().then((response) => {
            setServerInfo(response as API.ServerInfo);
        });
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MonitorContext.Provider value={{serverInfo, setServerInfo, loading}}>
            {children}
        </MonitorContext.Provider>
    )
}


export const useMonitorContext = () => {
    return useContext(MonitorContext);
};
