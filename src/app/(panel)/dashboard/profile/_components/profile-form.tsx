import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface UseProfileFormProps {
  name: string | null;
  adress: string | null;
  phone: string | null;
  status:  boolean;
  timezone: string | null;
}

const profileSchema = z.object({
  name: z.string().min(1, { message: "Campo nome é necessário" }),
  adress: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timezone: z.string().min(1, { message: "Selecione o fuso horário" }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm({
  name,
  adress,
  phone,
  status,
  timezone,
}: UseProfileFormProps) {
  return useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name || "",
      adress: adress || "",
      phone: phone || "",
      status: status ? "active" : "inactive",
      timezone: timezone || "",
    },
  });
}
