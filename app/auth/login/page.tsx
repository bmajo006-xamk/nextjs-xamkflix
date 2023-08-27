
import Logo  from '@/components/Logo';
import Link from 'next/link';
import LoginForm from '@/components/LoginForm';


export default function LoginPage () {

    return (
    <div className="flex flex-col justify-center items-center py-8">
        <div className="shadow-xl dark:bg-stone-800 p-3 min-w-[600px] min-h-[560px] flex flex-col items-center">
            <div  className="mb-9 py-6 h-1/3">
                <Logo />
            </div>
            <div>
                <LoginForm />
            </div>
            <div>
                <Link href="/auth/register">
                    <button 
                        className="py-2 px-4 w-[260px] lg:w-[400px] lg:h-[50px] text-white rounded-md mt-3 bg-stone-700 opacity-0.5 font-semibold shadow-md">Rekisteröidy
                    </button>
                </Link>

            </div>
        </div>
    </div>
    )

}