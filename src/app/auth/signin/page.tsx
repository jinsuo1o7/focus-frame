import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import SignIn from "@/components/signin/SignIn";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Login in with social account",
};
type Props = { searchParams: { callbackUrl: string } };
export default async function SingInPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  const providers = (await getProviders()) ?? {};
  return <SignIn providers={providers} callbackUrl={callbackUrl ?? "/"} />;
}
