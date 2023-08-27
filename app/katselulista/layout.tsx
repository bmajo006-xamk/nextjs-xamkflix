'use client';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

interface Props {
  children: React.ReactNode
}

export default function KatselulistaLayout({children}: Props) {


  return (

    <div className="dark:bg-stone-900 bg-vaaleanharmaa relative">
    <Header />
    <div className="flex flex-col">
      <div className="basis-5/6">
        <div className="flex flex-row">
          <div className="basis-1/7 shadow-xl">
          <div className="mt-20 drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <div className="basis-6/7 dark:bg-stone-900 bg-vaaleanharmaa">
                {children}
              </div>
            </div>
            <Navbar />
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
       
  )
}
