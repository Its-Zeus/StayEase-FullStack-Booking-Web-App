import { clerkClient } from "@clerk/nextjs/server"

const getUserInfos = async (userid: string) => {
  try {
    const res = await clerkClient.users.getUser(userid)
    const createdAtDate = new Date(res.createdAt)
    const now = new Date()
    const timeDifference = now.getTime() - createdAtDate.getTime()
    const timeDifferenceInDays = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24)
    )
    const timeDifferenceInHours =
      Math.floor(timeDifference / (1000 * 60 * 60)) % 24
    const timeDifferenceInMinutes =
      Math.floor(timeDifference / (1000 * 60)) % 60
    const createdAtDateString = createdAtDate.toISOString().split("T")[0]
    const extendedResponse = {
      ...res,
      createdAtDate: createdAtDateString,
      timeSinceCreation: `${timeDifferenceInDays} days`,
    }
    if (!extendedResponse) {
      return null
    }
    return extendedResponse
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get user", { cause: error })
  }
}

export default getUserInfos
