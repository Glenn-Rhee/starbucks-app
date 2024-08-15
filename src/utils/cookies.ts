import { cookies } from "next/headers";

export function setCookie(name: string, value: string) {
  //   cookies().set(name, value, {
  //     expires: Date.now() - oneDay,
  //     sameSite: "strict",
  //   });

  cookies().set({
    name,
    value,
  });
}

export const getCookie = (name: string) => cookies().get(name);
