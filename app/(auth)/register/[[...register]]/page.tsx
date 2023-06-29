import { SignUp } from "@clerk/nextjs";

const RegisterPage = () => {
  return <SignUp afterSignUpUrl="/new-user" redirectUrl="/new-user" />;
};

export default RegisterPage;
