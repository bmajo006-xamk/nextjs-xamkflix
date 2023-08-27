import { haeElokuvat } from '@/lib/elokuvarekisteri';
import Carousel from '@/components/Carousel';
import ElokuvaEsittely from '@/components/ElokuvaEsittely';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
 
export default async function HomePage() {

    const elokuvat : Elokuva[] = await haeElokuvat();

    return (
        <> <div className="dark:bg-stone-900 bg-vaaleanharmaa relative">
        <Header />
        <div className="flex flex-col">
          <div className="basis-5/6">
            <div className="flex flex-row">
              <div className="basis-1/7 shadow-xl">
              <div className="mt-20 drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                  <div className="basis-6/7 dark:bg-stone-900 bg-vaaleanharmaa">
        
            <div className="flex flex-wrap content-center">
                <div className="p-8">
                    <Carousel/>
                </div>

                {elokuvat.map((elokuva : Elokuva, idx : number) => {
                    return (
                    <div key={idx} className="w-1/2 lg:w-1/4 mb-2">
                        <ElokuvaEsittely elokuva={elokuva} />
                    </div>
                    )
                })}
            </div>
            </div>
                  </div>
                  <Navbar />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        </>
    );
}

