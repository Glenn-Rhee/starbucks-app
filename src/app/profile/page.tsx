import Container from "@/components/Container";
import HeaderProfile from "@/components/views/profile/HeaderProfile";
import ProfileView from "@/components/views/profile/ProfileView";
import { ResponsePayload } from "@/models/user-model";
import { getCookie } from "@/utils/cookies";

export default async function ProfilePage() {
  const baseUrl = process.env.BASE_URL;
  const token = getCookie("token");
  const response = await fetch(baseUrl + "/api/user", {
    method: "GET",
    headers: {
      bearir: token?.value || "",
    },
  });

  const data = (await response.json()) as ResponsePayload;

  return (
    <>
      <HeaderProfile data={data.data} />
      <Container>
        <ProfileView data={data.data} />
      </Container>
    </>
  );
}
