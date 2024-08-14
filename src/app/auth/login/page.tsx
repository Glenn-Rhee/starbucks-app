import ContainerAuth from "@/components/ContainerAuth";
import LoginViews from "@/components/views/auth/login/LoginViews";

export default function LoginPage() {
  return (
    <ContainerAuth>
      <LoginViews />
    </ContainerAuth>
  );
}
