import Image from 'next/image';
import menu from '@/public/svg/menu.svg';


export default function Menu(): React.ReactElement {
    
    return (
    <label htmlFor="my-drawer-2" className="btn-square bg-indigo-500 flex justify-center p-2 drawer-button rounded-md p-2 inline-block lg:hidden hover:bg-tummanharmaa cursor-pointer">
        <Image  width="25" height="20" alt="menu" src={menu} />
    </label>

    )
}