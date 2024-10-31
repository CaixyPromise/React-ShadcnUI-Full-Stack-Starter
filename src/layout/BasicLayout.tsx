import React from 'react';
import Header from "@/layout/components/Header";
import Footer from "@/components/Footer";

interface BasicLayoutProps {
    children: React.ReactNode;
}

const BasicLayoutPage: React.FC<BasicLayoutProps> = ({ children }) => {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <Header />
                {/*content区域*/}
                <main className="flex-grow">
                    <div className="max-w-7xl mx-auto px-0 lg:px-5">
                        {/*<GlobalBreadcrumb />*/}
                        {children}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default BasicLayoutPage;
