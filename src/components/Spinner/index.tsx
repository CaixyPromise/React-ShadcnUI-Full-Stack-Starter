import React from 'react';
import {Icon} from "@/components/ui/icons";
import {Conditional} from "@/components/Conditional";

interface SpinProps
{
    children: React.ReactNode
    loading: boolean
}

const SpinPage: React.FC<SpinProps> = ({children, loading}) =>
{
    return (
        <>
            <div style={{position: 'relative', display: 'inline-block'}}>
                <Conditional value={loading}>
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)', // 半透明背景以便可见
                            zIndex: 1,
                        }}
                    >
                        <Icon icon="Spinner" className="animate-spin"/>
                    </div>
                </Conditional>
                <div style={{opacity: loading ? 0.5 : 1}}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default SpinPage;
