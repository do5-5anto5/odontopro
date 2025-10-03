import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, { message: "Campo nome é necessário" }),
  adress: z.string().optional(),
  phone: z.string().optional(),
  status: z.string(),
  timezone: z.string().min(1, { message: "Selecione o fuso horário" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function useProfileForm() {
    return useForm<ProfileFormData>(
        {resolver: zodResolver(profileSchema),
            defaultValues:{
                name: "",
                adress: "",
                phone: "",
                status: "",
                timezone: "",
            }
        }
    )
}
