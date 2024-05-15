import Image from "next/image";
import Vector from '../../../../utils/images/Vector.png';
import FrameSVG from '../../../../utils/images/FrameSVG.svg';
import Frame2 from '../../../../utils/images/Frame2.svg';

export default function About() {
  return (
    <div className="w-full bg-gray-100">
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="max-w-screen-lg p-8 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="pr-8" style={{ width: '50rem', flexShrink: 0 }}>
                <Image src={Vector} alt="Vector" width={600} height={800} />
              </div>
            </div>

            <div className="pr-8 w-2 ml-8 ">
              <div className="container max-w-xl">
                <div className="w-[10rem] h-[15rem] relative pt-12">
                  <div className="w-[30rem] text-neutral-800 text-xl font-extrabold font-['Gellix']">About Us</div>
                  <div className="w-[30rem] text-neutral-400 text-sm font-normal font-['Gellix']">Bookagri was born in 2015 with an idea to connect farmers and farming experiences with local and foreign tourists.  <br/>Every day, hosts offer unique agritourism experiences and rural stays that make it possible for guests to connect with rural communities in a more authentic way.</div>
                  <div className="w-[30rem] h-[6.438rem] justify-start items-center gap-4 inline-flex my-8">
                    <div className="w-[6.438rem] h-[6.438rem] relative">
                      <div className="w-[6rem] h-[6rem] left-0 top-0 absolute bg-white rounded-[1.25rem]" />
                      <div className="w-2.5rem h-[2.188rem] left-[1.938rem] top-[2.125rem] absolute">
                        <Image className="w-2.5rem h-2.5rem" src={FrameSVG} alt="Frame" />
                        <div className="w-2.5rem h-[2.188rem] left-0 top-0 absolute"></div>
                      </div>
                    </div>
                    <div className="w-[23.563rem] flex-col justify-start items-start gap-2 inline-flex">
                      <div className="mx-8">
                        <div className="w-[23.875rem] text-neutral-800 text-sm font-extrabold font-['Gellix']">Vision</div>
                        <div className="w-[23.875rem] text-neutral-400 text-sm font-normal font-['Gellix']">Bookagri envisions a leading global interactive platform for agritourism where anyone can belong to any agritourism experience anytime, anywhere using their device.</div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30rem] h-[6.438rem] justify-start items-center gap-4 inline-flex my-8">
                    <div className="w-[6.438rem] h-[6.438rem] relative ">
                      <div className="w-[6rem] h-[6rem] left-0 top-0 absolute bg-white rounded-[1.25rem]" />
                      <div className="w-2.5rem h-[2.188rem] left-[1.938rem] top-[2.125rem] absolute">
                        <Image className="w-2.5rem h-2.5rem" src={Frame2} alt="Frame" />
                        <div className="w-2.5rem h-[2.188rem] left-0 top-0 absolute"></div>
                      </div>
                    </div>
                    <div className="w-[23.563rem] flex-col justify-start items-start gap-2 inline-flex">
                      <div className="mx-8">
                        <div className="w-[23.875rem] text-neutral-800 text-sm font-extrabold font-['Gellix'] ">Mission</div>
                        <div className="w-[23.875rem] text-neutral-400 text-sm font-normal font-['Gellix']">Bookagri is on a mission to bring in all agritourism businesses to its platform where everyone can connect with their inner farmer at any village, farm and countryside worldwide.</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="px-6 py-3 bg-lime-600 text-white text-sm font-bold rounded-xl">Read More</button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
