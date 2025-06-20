import Main from '@/src/components/mainItem';

export default function TaskDetailLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
        {children}
        </>
        // <Main href='/' hrefName='HOME'>
        //     {children}
        // </Main>
    );
}