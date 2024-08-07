import Container from "@/components/Container";
import HeaderProfile from "@/components/views/profile/HeaderProfile";
import ProfileView from "@/components/views/profile/ProfileView";

export default async function ProfilePage() {
  return (
    <>
      <HeaderProfile />
      <Container>
        <ProfileView />
      </Container>
    </>
  );
}
