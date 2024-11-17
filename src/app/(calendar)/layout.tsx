import {Toaster} from "react-hot-toast";

export default function VacanciesLayout({
                                            children,
                                        }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Toaster/>
            {children}
        </>
    );
}