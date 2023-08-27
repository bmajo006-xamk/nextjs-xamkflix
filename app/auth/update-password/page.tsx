import Logo from '@/components/Logo';
import ResetPasswordForm from '@/components/ResetPasswordForm';


export default function updatePassword () : React.ReactElement {


    return (
        <div className="flex flex-col justify-center items-center py-8">
            <div className="shadow-xl dark:bg-stone-800 p-3 min-w-[600px] min-h-[560px] flex flex-col items-center">
                <div  className="mb-9 py-6 h-1/3">
                    <Logo />
                </div>
                <div>
                    <ResetPasswordForm />
                </div>
            </div>
 
    </div>
    )
}