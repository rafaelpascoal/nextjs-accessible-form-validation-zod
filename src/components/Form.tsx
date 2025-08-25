"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, FormSchema } from "@/Schemas/formSchema"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { countries } from "@/utils/Countries"
import Flag from "react-flagkit"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function Form() {
  const { register, handleSubmit, formState: { errors }, control, trigger } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormSchema) => {
    console.log("Form submitted:", data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6 border rounded-lg">

      {/* Name and Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
          <Input placeholder="Full name" {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <Input placeholder="Email" {...register("email")} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Birth Date and Document */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium mb-2">Birth Date</label>
          <Controller
            control={control}
            name="birthDate"
            render={({ field }) => (
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Input 
                      placeholder="DD/MM/YYYY" 
                      value={field.value ? field.value.toLocaleDateString('pt-BR') : ''}
                      readOnly
                      className="cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        trigger("birthDate");
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>}
              </div>
            )}
          />
        </div>

        <div>
          <label htmlFor="document" className="block text-sm font-medium mb-2">Document</label>
          <Input placeholder="000.000.000-00" {...register("document")} />
          {errors.document && <p className="text-red-500 text-sm mt-1">{errors.document.message}</p>}
        </div>
      </div>

      {/* Address and Zip Code */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium mb-2">Address</label>
          <Input placeholder="Address" {...register("address")} />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-2">Zip Code</label>
          <Input placeholder="00000-000" {...register("zipCode")} />
          {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode.message}</p>}
        </div>
      </div>

      {/* Phone and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone</label>
          <Input placeholder="+55 11987654321" {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <Controller
            control={control}
            name="country"
            defaultValue="" // initial value required
            rules={{ required: true }}
            render={({ field }) => (
              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value); // update RHF
                    trigger("country");    // force validation
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Country" />
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
                  <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                )}
              </div>
            )}
          />
        </div>
      </div>

      {/* Button */}
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
