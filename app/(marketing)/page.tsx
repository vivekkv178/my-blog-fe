import Posts from "./Posts";
import { unstable_cache } from "next/cache";
import { FIREBASE_CONSTANTS } from "@/lib/constants";
import { listDocumentsFromCollection } from "@/lib/firebaseAdmin";

export default async function Home() {
  const getPosts = unstable_cache(
    async () => {
      return await listDocumentsFromCollection(
        FIREBASE_CONSTANTS.BLOGS_COLLECTION_NAME,
      );
    },
    ["blogs"],
    {
      tags: ["blogs"],
    },
  );

  const posts: any = await getPosts();

  return <Posts posts={posts} />;
}
