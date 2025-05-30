// import ResetPasswordForm from '../../../../components/ResetPasswordForm';

// interface Props {
//   params: {
//     uidb64: string;
//     token: string;
//   };
// }

// export default function ResetPasswordPage({ params }: Props) {
//   return <ResetPasswordForm uidb64={params.uidb64} token={params.token} />;
// }
import ResetPasswordForm from '../../../../components/ResetPasswordForm';

// No need to define an interface unless you're reusing it elsewhere
export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ uidb64: string; token: string }>;
}) {
  const { uidb64, token } = await params;

  return <ResetPasswordForm uidb64={uidb64} token={token} />;
}