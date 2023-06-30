import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className=" flex justify-center align-middle">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#8B5CF6",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
