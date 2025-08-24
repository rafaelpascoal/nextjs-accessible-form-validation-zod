"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormSchema } from "@/Schemas/formSchema"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { countries } from "@/utils/Countries"
import Flag from "react-flagkit"

export default function Form() {
  const { register, handleSubmit, formState: { errors }, control, trigger } = useForm<FormSchema>({
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

      {/*
        Observations about the custom Select with shadcn/ui and Zod validation:

        1. The Select of shadcn/ui is not a native HTML input, so the react-hook-form cannot
          capture the value automatically as it would with an <input>.

        2. So, we use the Controller of react-hook-form to connect the field to the form.

        3. It is necessary to define `defaultValue=""` so that Zod does not return "invalid input"
          when the field is empty.

        4. We call `trigger("country")` inside the onValueChange to force the Zod validation
          as soon as the user selects a country, ensuring that the custom message appears.

        ✅ In this way:
          - The selected value is synchronized correctly with the RHF.
          - Zod validates the field and returns the message defined in the schema.
          - The validation works like native fields of the form.
      */}

      <div>
        <Controller
          control={control}
          name="country"
          defaultValue="" // initial value required
          rules={{ required: true }}
          render={({ field }) => (
            <div>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value); // update RHF
                  trigger("country");    // force validation
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      <div className="flex items-center gap-2">
                        <Flag country={country.value.toUpperCase()} />
                        {country.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Button */}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
