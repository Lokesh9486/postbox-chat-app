import "@/styles/pages/home.scss";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')
  if(!token){
    return redirect("/signin");
  }
  return  redirect("/chat");
}
