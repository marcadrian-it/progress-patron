import { SignUp } from "@clerk/nextjs";

const RegisterPage = () => {
  return (
    <SignUp
      appearance={{
        variables: {
          colorPrimary: "#8B5CF6",
        },
      }}
      afterSignUpUrl="/new-user"
      redirectUrl="/new-user"
    />
  );
};

export default RegisterPage;
