import ManagePosts from "./ManagePosts";

const page = () => {
  const MANAGE_POSTS = process?.env?.MANAGE_POSTS || "";
  return <ManagePosts managePosts={MANAGE_POSTS} />;
};

export default page;
