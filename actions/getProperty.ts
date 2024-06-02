import prismadb from "@/lib/prismadb"

const getPoperty = async (propertyid: string) => {
  try {
    const property = await prismadb.property.findUnique({
      where: {
        id: propertyid,
      },
    })
    if (!property) return null

    return property
  } catch (error) {
    throw new Error("Failed to get property", { cause: error })
  }
}

export default getPoperty
