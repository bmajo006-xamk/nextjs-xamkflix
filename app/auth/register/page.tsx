import RegisterForm from '@/components/RegisterForm';



export default function RegisterPage () {

    return (
    <div className="flex flex-col justify-center items-center py-8">
        <div className="shadow-xl dark:bg-stone-800 p-6 min-w-[600px] min-h-[560px] flex flex-col items-center">
            <div  className="mb-9 py-6 h-1/3">
                <h3 className="text-3xl dark:text-white text-musta float-left">Rekisteröityminen</h3>
            </div>
            <div>
                <RegisterForm />
            </div>
        </div>
    </div>
    )

}