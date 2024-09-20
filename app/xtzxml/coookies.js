"use server";

import { cookies } from "next/headers";

export default async function CreaCookies() {
  const cookiesStore = cookies();
  cookiesStore.set("session", true);
}
