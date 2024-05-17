import ProductsImg from '@images/home/Products.jpg';
import Events from '@images/home/Events.jpg';
import ImageContainer from './ImageContainer';
import Experiences from  '@images/home/Experiences.png'
import Stays from  '@images/home/Stays.png'
import Offers from  '@images/home/Offers.png'



export default function DiscoverBookagri() {
  return (
    <section className='mt-[8.375rem] my-[7.5rem] flex flex-col gap-8 justify-center items-center'>
      <div className='w-full max-w-[102.5rem] flex gap-8 flex-col laptopS:flex-row'>
        <div className='flex flex-col gap-8'>
          {/* Experiences */}
          <ImageContainer
            image={Experiences}
            title={'Experiences'}
            alt={'Experiences'}
            style={{
              maxHeight: '34rem',
              objectFit: 'cover',
              borderRadius: '2rem',
            }}
          />

          {/* Stays */}
          <ImageContainer
            image={Stays}
            title={'Stays'}
            alt={'Stays'}
            style={{
              maxHeight: '43.8125rem',
              objectFit: 'cover',
              borderRadius: '2rem',
              zIndex: "-10"
            }}
          />
        </div>
        <div className='flex flex-col gap-8'>
          {/* Events */}
          <ImageContainer
            image={Events}
            title={'Events'}
            alt={'Events'}
            style={{
              maxHeight: '44.125rem',
              objectFit: 'cover',
              borderRadius: '2rem',
            }}
          />

          {/* Offers & Packages */}
          <ImageContainer
            image={Offers}
            title={'Offers & Packages'}
            alt={'Offers & Packages'}
            style={{
              maxHeight: '33.6875rem',
              objectFit: 'cover',
              borderRadius: '2rem',
            }}
          />
        </div>
      </div>

      {/* Products */}
      <div className='flex flex-col gap-8 w-'>
        <ImageContainer
          image={ProductsImg}
          title={'Products'}
          alt={'Products'}
          style={{
            width: '100%',
            maxHeight: '34rem',
            objectFit: 'cover',
            borderRadius: '2rem',
          }}
        />
      </div>
    </section>
  );
}
