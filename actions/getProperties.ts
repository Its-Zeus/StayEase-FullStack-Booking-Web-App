import prismadb from "@/lib/prismadb"

interface Props {
  searchParams: {
    title: string
    country: string
    state: string
    city: string
  }
  page: number
  limit: number
}
export const getProperties = async ({ page, limit, searchParams }: Props) => {
  try {
    const { country, state, city } = searchParams
    const properties = await prismadb.property.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        title: {
          contains: searchParams.title,
        },
        country,
        state,
        city,
      },
    })

    return properties
  } catch (error) {
    console.log(error)
    throw new Error("Failed to get properties", { cause: error })
  }
}
