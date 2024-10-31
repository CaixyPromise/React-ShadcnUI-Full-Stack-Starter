import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ArrowRight, Zap, Layers, Paintbrush, Globe} from 'lucide-react'
import {Icon} from "@/components/ui/icons";
import GitHubInfo from "@/components/GithubUser";

export default function WelcomePage()
{
    const features = [
        {
            icon: <Zap className="h-6 w-6"/>,
            title: "快速开发",
            description: "使用我们预配置的设置和组件快速构建现代网页应用。",
            link: "#fast-development"
        },
        {
            icon: <Layers className="h-6 w-6"/>,
            title: "模块化架构",
            description: "利用我们的模块化设计轻松扩展和自定义您的应用。",
            link: "#modular-architecture"
        },
        {
            icon: <Paintbrush className="h-6 w-6"/>,
            title: "美观的用户界面",
            description: "使用 shadcn/ui 组件和 Tailwind CSS 创建令人惊叹的用户界面。",
            link: "#beautiful-ui"
        }
    ];


    const templateInfo = [
        {
            label: "Next.js", value: "14.2.12",
            logo: "NextJs"
        },
        {
            label: "React", value: "18.2.0",
            logo: "React"
        },
        {
            label: "TypeScript", value: "5.1.6",
            logo: "TypeScript"
        },
        {
            label: "Tailwind CSS", value: "3.3.3",
            logo: "Tailwind"
        },
        {
            label: "Node.js", value: ">=16.8.0",
            logo: "NodeJs"
        },
        {
            label: "Redux", value: "^9.1.2",
            logo: "Redux"
        },
        {
            label: "shadcn/ui", value: "2.1.0",
            logo: "ShadcnUI"
        },
        {
            label: "MomentJs", value:"2.30.1",
            logo: "MomentJs"
        },
        {
            label: "Axios", value: "^1.7.7",
            logo: "Axios"
        }
    ]

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4">
                Welcome to <span
                className="hover:text-teal-400 transition-colors duration-300 cursor-pointer">Next Template </span>
                Starter
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
                基于 Next.js、React、shadcn/ui 和 Tailwind CSS构建的快速上手的前端项目框架，让您更加容易专注于最重要的事情。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                    <Card
                        key={index}
                        className="transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                    >
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-primary">{feature.icon}</span>
                                {feature.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-muted-foreground">
                                {feature.description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="link"
                                className="p-0 transition-colors duration-300 ease-in-out hover:text-primary"
                            >
                                了解更多<ArrowRight
                                className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"/>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>


            <h2 className="text-2xl font-semibold mb-4">模板信息</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {templateInfo.map((info, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg transition-all duration-300 ease-in-out hover:shadow-lg hover:bg-muted/80 cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Icon icon={info.logo} className="h-6 w-6"/>
                            <span className="font-medium">{info.label}</span>
                        </div>
                        <Badge variant="secondary" className="transition-all duration-300 ease-in-out hover:scale-110">
                            {info.value}
                        </Badge>
                    </div>
                ))}
            </div>

            <div className="mb-4">
                <div className="md:col-span-3">
                    <GitHubInfo username="CaixyPromise" repo="Springboot-inital-template"/>
                </div>
            </div>
        </div>
    )
}