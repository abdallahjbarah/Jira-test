import ProductsImg from '@images/home/Products.jpg';
import Events from '@images/home/Events.jpg';
import ImageContainer from './ImageContainer';
import Experiences from  '@images/home/Experiences.png'
import Stays from  '@images/home/Stays.png'
import Offers from  '@images/home/Offers.png'



export default function DiscoverBookagri() {
  return (
    <section className='px-[1rem] laptopS:px-0 mt-[4rem] laptopS:mt-[8.375rem] my-[7.5rem] flex flex-col gap-8 justify-center items-center'>
      <div className='w-full max-w-[102.5rem] flex gap-8 flex-col laptopS:flex-row justify-center'>
        <div className='flex flex-col gap-8'>
          {/* Experiences */}
          <ImageContainer
            image={Experiences}
            title={'Experiences'}
            alt={'Experiences'}
            className={"h-[25rem] laptopS:h-full w-full"}
          />

          {/* Stays */}
          <ImageContainer
            image={Stays}
            title={'Stays'}
            alt={'Stays'}
            className={"h-[25rem] laptopS:h-full w-full"}

          />
        </div>

        <div className='flex flex-col gap-8'>
          {/* Events */}
          <ImageContainer
            image={Events}
            title={'Events'}
            alt={'Events'}
            className={"h-[25rem] laptopS:h-full w-full"}

          />

          {/* Offers & Packages */}
          <ImageContainer
            image={Offers}
            title={'Offers & Packages'}
            alt={'Offers & Packages'}
            className={"h-[25rem] laptopS:h-full w-full"}

          />
        </div>
      </div>

      {/* Products */}
      <div className='flex flex-col gap-8 w-full laptopS:w-fit'>
        <ImageContainer
          image={ProductsImg}
          title={'Products'}
          alt={'Products'}
          className={"h-[25rem] laptopS:max-h-[34rem] laptopS:h-full w-full"}

        />
      </div>
    </section>
  );
}
