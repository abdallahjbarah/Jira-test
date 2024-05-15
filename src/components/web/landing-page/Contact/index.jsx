
import Image from "next/image";
import Photo from '../../../../utils/images/Photo.jpg';

import WA_Logo from '../../../../utils/images/WA_Logo.svg';
import tiktok from '../../../../utils/images/tiktok.svg';
import insta from '../../../../utils/images/insta.svg';
import linkedin from '../../../../utils/images/linkedin.svg';
import facebook from '../../../../utils/images/facebook.svg';
import email from '../../../../utils/images/email.svg';
import address from '../../../../utils/images/address.svg';
import phone from '../../../../utils/images/phone.svg';



export default function Contact() {
    return (
        <>
  <div className="w-full">
      <div className="max-w-sm w-full lg:max-w-full lg:flex">
        <div className="relative w-full h-full flex justify-center items-center">
          <div className="max-w-screen-lg p-8 flex">
            <div className="w-1/2 flex justify-center items-center">
              <div className="pr-8" style={{ width: '50rem', flexShrink: 0 }}>
                <Image src={Photo} alt="Photo" width={600} height={800} />
              </div>
            </div>
                <div className="pr-8 w-2 ml-8 ">
                <div className="container">
                    <div className="w-[10rem] h-[15rem] relative pt-12">
                    <div className="w-[30rem] text-lime-600 text-xl font-extrabold font-['Gellix']">Contact Us</div>
                    <div className="w-[30rem] text-neutral-800 text-3xl font-extrabold font-['Gellix']">Have a question or feedback?</div>
                    <div className="w-[30rem] h-[6.438rem] justify-start items-center gap-4 inline-flex my-8">
                        <div className="w-[6.438rem] h-[6.438rem] relative">
                        <div className="w-[6rem] h-[6rem] left-0 top-0 absolute bg-white rounded-[1.25rem]" />
                        
                        <div className="w-[31.25rem] h-[6.25rem] relative">
                            <div className="w-[31.25rem] h-[7.5rem] left-0 top-0 absolute bg-white" />
                            <div className="w-[21.75rem] h-[3.875rem] left-[8rem] top-[1.813rem] absolute">
                                <div className="left-0 top-0 absolute text-neutral-800 text-lg font-extrabold font-['Gellix']">Email</div>
                                <div className="w-[21.75rem] left-0 top-[2.313rem] absolute text-neutral-400 text-base font-normal font-['Gellix'] leading-[1.563rem]">info@bookagri.com</div>
                            </div>
                            <div className="left-[1rem] top-[1rem] absolute">
                                <div className="w-[5.5rem] h-[5.5rem] left-0 top-0 absolute bg-lime-600/opacity-5 rounded-[0.688rem]" />
                                <div className="w-[4rem] h-30 left-[1.313rem] top-[1.5rem] absolute">
                                <div className="absolute  bg-lime-600 rounded-full" />
                                <Image src={email}/>
                                <div className="w-10 h-10 left-[0.188rem] top-0 absolute">
                                </div>
                                </div>
                            </div>
                            </div>



            <div className="w-[31.25rem] h-[6.25rem] relative">
                <div className="w-[31.25rem] h-[7.5rem] left-0 top-0 absolute bg-white rounded-2xl border border-gray-200" />
                <div className="w-[21.75rem] h-[3.875rem] left-[8rem] top-[1.813rem] absolute">
                    <div className="left-0 top-0 absolute text-neutral-800 text-lg font-extrabold font-['Gellix']">Phone</div>
                    <div className="w-[21.75rem] left-0 top-[2.313rem] absolute text-neutral-400 text-base font-normal font-['Gellix'] leading-[1.563rem]">00962-77-2236393</div>
                </div>
                    <div className="left-[1rem] top-[1rem] absolute">
                        <div className="w-[5.5rem] h-[5.5rem] left-0 top-0 absolute bg-lime-600/opacity-5 rounded-[0.688rem]" />
                        <div className="w-[4rem] h-30 left-[1.313rem] top-[1.5rem] absolute ">
                        <div className=" bg-lime-600 rounded-full" />
                        <Image  src={phone}/>
                        <div className="w-10 h-10 left-[0.188rem] top-0 absolute">
                        </div>
                        </div>
                            </div>
                            </div>
                 <div className="w-[31.25rem] h-[6.25rem] relative">
                            
                            <div className="w-[21.75rem] h-[3.875rem] left-[8rem] top-[1.813rem] absolute">
                                
                                <div className="left-0 top-0 absolute text-neutral-800 text-lg font-extrabold font-['Gellix']">Address</div>
                                <div className="w-[21.75rem] left-0 top-[2.313rem] absolute text-neutral-400 text-base font-normal font-['Gellix'] leading-[1.563rem]">Marj Al-Hamam, Amman , Jordan <br/>
                            Zip Code: 11733</div>
                            </div>
                            
                            <div className="left-[1rem] top-[1rem] absolute">
                                <div className="w-[5.5rem] h-[5.5rem] left-0 top-0 absolute bg-lime-600/opacity-5 " />
                                <div className="w-[4rem] h-30 left-[1.313rem] top-[2rem] absolute">
                                <div className=" absolute opacity-30 bg-lime-600 " />
                                <Image src={address}/>
                                <div className="w-10 h-10 left-[0.938rem] top-0 absolute">
                                </div>
                                </div>
                                
                            </div>
                    </div>        
                    
                        
                            <div className="w-[33.75rem] mt-12 justify-center items-start gap-[2rem] inline-flex">
                            <div className="w-[3.75rem] h-[3.75rem] relative">
                                <div className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute bg-gradient-to-tr from-amber-200 via-orange-500 to-indigo-600 rounded-full" />
                                <Image className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute rounded-full" src={insta} />

                                <div className="w-6 h-6 left-[1.125rem] top-[1.124rem] absolute">
                                </div>
                            </div>
                            <div className="w-[3.75rem] h-[3.75rem] relative">
                                <div className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute bg-indigo-800 rounded-full" />
                                <Image className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute rounded-full" src={facebook} />

                            </div>
                            <div className="w-[3.75rem] h-[3.75rem] relative">
                                <div className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute bg-neutral-800 rounded-full" />
                                <Image className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute rounded-full " src={tiktok} />

                                <div className="w-[1.322rem] h-6 left-[1.188rem] top-[1.125rem] absolute">
                                </div>
                            </div>
                            <div className="w-[3.75rem] h-[3.75rem] relative">
                                <div className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute bg-sky-600 rounded-full" />
                                <Image className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute rounded-full" src={linkedin} />

                            </div>
                            <div className="w-[3.75rem] h-[3.75rem] relative">
                                <Image className="w-[3.75rem] h-[3.75rem] left-0 top-0 absolute rounded-full bg-green-500" src={WA_Logo} />
                            </div>
                            </div>

                                                    
                        
                        </div>
                        
                    
                    </div>
                
                
                    </div>
                    
                    
                </div>
                
                </div>

            
          </div>
          
        </div>
        
      </div>
      
    </div>
        </>
    )
}