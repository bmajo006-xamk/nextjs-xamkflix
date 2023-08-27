import ThemeButton from '@/components/ThemeButton';


interface Props {
    children: React.ReactNode
  }

  export default function AuthLayout ({ children} : Props) {

    return (
        <>
            <div className="dark:bg-stone-900 bg-vaaleanharmaa h-screen w-screen">
                <div className="py-4 px-10 w-full h-20">
                    <ThemeButton />
                </div>
                {children}
            </div>
        </>
    )
}