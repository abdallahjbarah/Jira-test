import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import CustomLink from '@components/ui/CustomLink';
import BgHomePage from '@public/images/home/BgHomePage.jpg';
import Image from 'next/image';
import { fetchPolicies } from '@/lib/apis/policies/useFetchPolicies';
import { Locale } from '@utils/constants';

const TermsAndConditionsPage = async ({
  params,
}: {
  params: { lang: Locale };
}) => {
  const { lang } = params;

  const policiesData = await fetchPolicies();

  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(183deg, rgba(0, 0, 0, 0.33) 8.42%, rgba(0, 0, 0, 0.00) 38.77%), linear-gradient(92deg, rgba(0, 0, 0, 0.44) 18.39%, rgba(0, 0, 0, 0.00) 107.81%)',
      }}
      className='relative w-full min-h-screen flex items-center justify-center bg-gradient-full'
    >
      <div className='absolute top-0 left-0 w-full h-full -z-10'>
        <Image
          src={BgHomePage}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
          alt='Background'
          priority
        />
      </div>

      <div className='absolute top-[20px] left-[20px] z-20'>
        <CustomLink path={'/'}>
          <Image
            className='w-[11.8125rem] h-[3rem]'
            quality={100}
            src={BookagriLogoSvg}
            alt='Bookagri Logo'
          />
        </CustomLink>
      </div>

      <div className='z-10 text-white max-w-3xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg shadow-lg my-10'>
        <h1 className='text-3xl font-bold text-center mb-6'>
          {lang === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
        </h1>

        <div
          dangerouslySetInnerHTML={{
            __html:
              lang === 'ar'
                ? policiesData?.termsConditionsAr || ''
                : policiesData?.termsConditionsEn || '',
          }}
        />
        <div className='flex justify-center mt-8'>
          <CustomLink path='/'>
            <button className='bg-primary_1 hover:bg-primary_2 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transition'>
              Go to Home
            </button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
