import ChangePassword from "@/views/auth/changePassword";

const ChangePasswordTokenPage = ({
  params: { token },
}: {
  params: { token: string };
}): JSX.Element => {
  return <ChangePassword token={token} />;
};

export default ChangePasswordTokenPage;
