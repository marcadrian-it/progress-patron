import { redirect } from "next/navigation";

export default async function MainPage({}) {
  redirect("/home");
  return <div></div>;
}
