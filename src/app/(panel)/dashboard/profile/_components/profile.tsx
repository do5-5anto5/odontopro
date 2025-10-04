"use client";
import Image from "next/image";
import { useProfileForm } from "./profile-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import imgTest from "../../../../../../public/foto1.png";

export function ProfileContent() {
  const form = useProfileForm();

  return (
    <div>
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Minha Clínica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                  <Image
                    src={imgTest}
                    alt="Foto da clínica"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o nome da clínica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="adress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Endereço completo
                      </FormLabel>

                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Digite o endereço da clínica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">Telefone</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite o telefone..." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold">
                        Status da clínica
                      </FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue="active"
                        >
                          <SelectTrigger className="text-base">
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="active">
                              ATIVO (clínica aberta)
                            </SelectItem>
                            <SelectItem value="inactive">
                              INATIVO (clínica fechada)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
