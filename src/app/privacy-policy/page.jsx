// pages/privacy-policy.js
import BookagriLogoSvg from '@public/SVGs/shared/BookagriLogoSvg.svg';
import CustomLink from '@components/ui/CustomLink';
import BgHomePage from '@public/images/home/BgHomePage.jpg';
import Image from 'next/image';
import Head from 'next/head';

export default function page() {
  return (
    <div
      style={{
        backgroundImage:
          'linear-gradient(183deg, rgba(0, 0, 0, 0.33) 8.42%, rgba(0, 0, 0, 0.00) 38.77%), linear-gradient(92deg, rgba(0, 0, 0, 0.44) 18.39%, rgba(0, 0, 0, 0.00) 107.81%)',
      }}
      className="relative w-full min-h-screen flex items-center justify-center bg-gradient-full"
    >
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src={BgHomePage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          alt="Background"
          priority
        />
      </div>

      {/* Logo at the top-left corner */}
      <div className="absolute top-[20px] left-[20px] z-20">
      <CustomLink path={'/'}>
            <Image
                  className='w-[11.8125rem] h-[3rem]'
                  quality={100}
                  src={BookagriLogoSvg}
                  alt='Bookagri Logo'
                />
          </CustomLink>
      </div>

      {/* Privacy Policy Content */}
      <div className="z-10 text-white max-w-3xl mx-auto bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
        <Head>
          <title>Privacy Policy - BookAgri</title>
          <meta name="description" content="Privacy policy for the BookAgri app." />
        </Head>

        <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <p className="text-gray-200">
            This privacy policy applies to the BookAgri app (hereby referred to as "Application") for mobile devices that was created by Cryptonic-art (hereby referred to as "Service Provider") as a Free service. This service is intended for use "AS IS".
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Collection and Use</h2>
          <p className="text-gray-200 mb-4">
            The Application collects information when you download and use it. This information may include information such as:
          </p>
          <ul className="list-disc list-inside text-gray-200 mb-4">
            <li>Your device's Internet Protocol address (e.g. IP address)</li>
            <li>The pages of the Application that you visit, the time and date of your visit, the time spent on those pages</li>
            <li>The time spent on the Application</li>
            <li>The operating system you use on your mobile device</li>
          </ul>
          <p className="text-gray-200 mb-4">
            The Application does not gather precise information about the location of your mobile device.
          </p>
          <p className="text-gray-200 mb-4">
            The Service Provider may use the information you provided to contact you from time to time to provide you with important information, required notices, and marketing promotions.
          </p>
          <p className="text-gray-200">
            For a better experience, while using the Application, the Service Provider may require you to provide us with certain personally identifiable information. The information that the Service Provider requests will be retained by them and used as described in this privacy policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third Party Access</h2>
          <p className="text-gray-200 mb-4">
            Only aggregated, anonymized data is periodically transmitted to external services to aid the Service Provider in improving the Application and their service. The Service Provider may share your information with third parties in the ways that are described in this privacy statement.
          </p>
          <p className="text-gray-200 mb-4">
            Please note that the Application utilizes third-party services that have their own Privacy Policy about handling data. Below are the links to the Privacy Policy of the third-party service providers used by the Application:
          </p>
          <ul className="list-disc list-inside text-gray-200 mb-4">
            <li><a href="https://policies.google.com/privacy" className="text-blue-400 hover:underline">Google Play Services</a></li>
            <li><a href="https://www.facebook.com/privacy/policy" className="text-blue-400 hover:underline">Facebook</a></li>
          </ul>
          <p className="text-gray-200 mb-4">
            The Service Provider may disclose User Provided and Automatically Collected Information:
          </p>
          <ul className="list-disc list-inside text-gray-200 mb-4">
            <li>as required by law, such as to comply with a subpoena, or similar legal process;</li>
            <li>when they believe in good faith that disclosure is necessary to protect their rights, protect your safety or the safety of others, investigate fraud, or respond to a government request;</li>
            <li>with their trusted services providers who work on their behalf, do not have an independent use of the information we disclose to them, and have agreed to adhere to the rules set forth in this privacy statement.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Opt-Out Rights</h2>
          <p className="text-gray-200">
            You can stop all collection of information by the Application easily by uninstalling it. You may use the standard uninstall processes as may be available as part of your mobile device or via the mobile application marketplace or network.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention Policy</h2>
          <p className="text-gray-200">
            The Service Provider will retain User Provided data for as long as you use the Application and for a reasonable time thereafter. If you'd like them to delete User Provided Data that you have provided via the Application, please contact them at <a href="mailto:info@cryptonic-art.com" className="text-blue-400 hover:underline">info@cryptonic-art.com</a>, and they will respond in a reasonable time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children</h2>
          <p className="text-gray-200 mb-4">
            The Service Provider does not use the Application to knowingly solicit data from or market to children under the age of 13.
          </p>
          <p className="text-gray-200 mb-4">
            The Application does not address anyone under the age of 13. The Service Provider does not knowingly collect personally identifiable information from children under 13 years of age. In the case the Service Provider discovers that a child under 13 has provided personal information, the Service Provider will immediately delete this from their servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact the Service Provider at <a href="mailto:info@cryptonic-art.com" className="text-blue-400 hover:underline">info@cryptonic-art.com</a> so that they will be able to take the necessary actions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security</h2>
          <p className="text-gray-200">
            The Service Provider is concerned about safeguarding the confidentiality of your information. The Service Provider provides physical, electronic, and procedural safeguards to protect information the Service Provider processes and maintains.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes</h2>
          <p className="text-gray-200 mb-4">
            This Privacy Policy may be updated from time to time for any reason. The Service Provider will notify you of any changes to the Privacy Policy by updating this page with the new Privacy Policy. You are advised to consult this Privacy Policy regularly for any changes, as continued use is deemed approval of all changes.
          </p>
          <p className="text-gray-200">
            This privacy policy is effective as of 2029-12-01.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
          <p className="text-gray-200">
            By using the Application, you are consenting to the processing of your information as set forth in this Privacy Policy now and as amended by us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-200">
            If you have any questions regarding privacy while using the Application, or have questions about the practices, please contact the Service Provider via email at <a href="mailto:info@cryptonic-art.com" className="text-blue-400 hover:underline">info@cryptonic-art.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}