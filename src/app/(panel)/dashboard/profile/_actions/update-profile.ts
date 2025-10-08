"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Campo nome é necessário" }),
  adress: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timezone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) return { error: "User not found" };

  const schema = formSchema.safeParse(formData);

  if (!schema.success) return { error: "Preencha os campos necessários" };

  try {
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        name: formData.name,
        adress: formData.adress,
        phone: formData.phone,
        status: formData.status,
        timezone: formData.timezone,
        times: formData.times,
      },
    });

    return {
      data: "Clínica atualizada com sucesso!",
    };
  } catch (error) {
    console.log(error);
    return { error: "Falha ao atualizar Clínica" };
  }
}
