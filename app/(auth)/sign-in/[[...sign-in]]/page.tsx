import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center my-32 mx-auto">
      <SignIn path="/sign-in" />
    </div>
  )
}
