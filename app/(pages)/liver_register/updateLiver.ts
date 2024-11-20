"use server"

import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const updateLiverSchema = z.object({
  id: z.string(),
  index: z.coerce.number(),
  name: z.string(),
  aliasFirst: z.string().transform(input => input || null),
  aliasSecond: z.string().transform(input => input || null),
  channelHandle: z.string(),
  isRetire: z.enum(["0", "1"]).transform((input) => input === "1"),
  isOverseas: z.enum(["0", "1"]).transform((input) => input === "1"),
})

const updateLiver = async (formData: FormData) => {
  const rawData = {
    id: formData.get('id'),
    index: formData.get('index'),
    name: formData.get('name'),
    aliasFirst: formData.get('aliasFirst'),
    aliasSecond: formData.get('aliasSecond'),
    channelHandle: formData.get('channelHandle'),
    isRetire: formData.get('isRetire'),
    isOverseas: formData.get('isOverseas'),
  }
  const validFormData = updateLiverSchema.parse(rawData)

  await prisma.liver.upsert({
    where: {
      id: validFormData.id
    },
    create: {
      index: validFormData.index,
      name: validFormData.name,
      aliasFirst: validFormData.aliasFirst,
      aliasSecond: validFormData.aliasSecond,
      channelHandle: validFormData.channelHandle,
      isRetire: validFormData.isRetire,
      isOverseas: validFormData.isOverseas,
    },
    update: {
      index: validFormData.index,
      name: validFormData.name,
      aliasFirst: validFormData.aliasFirst,
      aliasSecond: validFormData.aliasSecond,
      channelHandle: validFormData.channelHandle,
      isRetire: validFormData.isRetire,
      isOverseas: validFormData.isOverseas,
    }
  })

  revalidatePath("/liver_register")
}

export default updateLiver