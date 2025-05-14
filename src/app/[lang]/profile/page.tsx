import { redirect } from 'next/navigation';

export default function ProfilePage({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}/profile/personal-info`);
}
