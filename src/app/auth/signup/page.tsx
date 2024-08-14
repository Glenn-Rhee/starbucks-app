import ContainerAuth from "@/components/ContainerAuth";
import SignupViews from "@/components/views/auth/signup/SignupViews";

export default function SignupPage() {
  return (
    <ContainerAuth>
      <SignupViews />
    </ContainerAuth>
  );
}
