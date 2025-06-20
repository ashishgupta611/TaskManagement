import Main from '@/src/components/mainItem';

export default function EditTaskLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <Main href='/' hrefName='HOME'>
            {children}
        </Main>
    );
}