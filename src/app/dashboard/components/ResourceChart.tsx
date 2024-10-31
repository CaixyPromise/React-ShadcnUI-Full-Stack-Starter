import React, {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export interface ResourceDataProps {
    data: Array<{
        name: string
        value?: number
    }>
    description?: Array<{
        name: string
        value?: number | string,
        prefix?: string
        before?: string
    }>
    title: string
}

export interface ResourceChartProps {
    data: ResourceDataProps,
}

const CustomTooltip = ({ active, payload, label }: {
    active: boolean,
    payload: any[],
    label: string,
    value: number
}) => {
    if (active && payload && payload.length) {

        return (
            <div className="flex items-center custom-tooltip bg-white p-4 rounded-lg shadow-lg border border-gray-200 transition-opacity duration-300">
                {/*显示颜色块*/}
                <div className="flex flex-col mr-4">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: payload[0]?.payload?.fill }}></div>

                </div>
                <div>
                    <p className="label font-semibold">{`${payload[0].name} : ${payload[0].value.toFixed(2)}%`}</p>
                </div>
            </div>
        )
    }

    return null
}

const ResourceChart: React.FC<ResourceChartProps> = ({data}) =>
{
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const onPieEnter = (_, index) =>
    {
        setActiveIndex(index)
    }
    // 添加处理单数据项的逻辑
    const processedData = data.data.length === 1
        ? [
            ...data.data,
            { name: `${data.data[0].name}-未使用`, value: 100 - data.data[0].value } // 计算未使用部分并添加到数据数组
        ]
        : data.data;

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            data={processedData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {processedData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={CustomTooltip} wrapperStyle={{ zIndex: 1000 }} />
                    </PieChart>
                </ResponsiveContainer>
                <div className="mt-4">
                    {data.data.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">{item.value?.toFixed(2)}%</span>
                        </div>
                    ))}
                    {data.description?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-sm font-medium">
                                {item.before||""}
                                {item.value}
                                {item.prefix||""}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ResourceChart
