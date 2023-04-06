import SideBar from "@/components/sidebar/SideBar";
import PostCardList from "@/components/postlist/PostCardList";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import FollowingBar from "@/components/followingbar/FollowingBar";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="flex p-4 gap-4">
      <div className="basis-full xl:basis-3/4">
        <PostCardList />
      </div>
      <div className="basis-0 xl:basis-1/4 hidden xl:block">
        <SideBar user={user} />
        <FollowingBar />
      </div>
    </section>
  );
}
