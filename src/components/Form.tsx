"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormSchema } from "@/Schemas/formSchema"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { countries } from "@/utils/Countries"
import Flag from "react-flagkit"

export default function Form() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormSchema) => {
    console.log("Form submitted:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-6 border rounded-lg">
      
      {/* Name */}
      <div>
        <Input placeholder="Full name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div>
        <Input placeholder="Email" {...register("email")} />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* Birth Date */}
      <div>
        <Input placeholder="Birth Date" {...register("birthDate")} />
        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate.message}</p>}
      </div>

      {/* Document */}
      <div>
        <Input placeholder="000.000.000-00" {...register("document")} />
        {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>}
      </div>

      {/* Zip Code */}
      <div>
        <Input placeholder="00000-000" {...register("zipCode")} />
        {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode.message}</p>}
      </div>

      {/* Phone */}
      <div>
        <Input placeholder="+55 11987654321" {...register("phone")} />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
      </div>

      {/* Country (Select) */}
      <div>
        <Select onValueChange={(value) => setValue("country", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country: { value: string; label: string; flag: string | undefined }) => (
              <SelectItem key={country.value} value={country.value}>
                <div className="flex items-center gap-2">
                  <Flag country={country.value.toUpperCase()} /> 
                  {country.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
      </div>

      {/* Button */}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
