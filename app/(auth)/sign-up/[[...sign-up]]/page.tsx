import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="w-full flex items-center justify-center my-32 mx-auto">
      <SignUp path="/sign-up" />
    </div>
  )
}
