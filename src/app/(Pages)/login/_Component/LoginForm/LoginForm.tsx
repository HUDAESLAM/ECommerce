"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { Loader } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email"),
  password: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/
      ,
      "Password must contain at least 1 letter, 1 number, and 6+ characters"
    )
})

type FormFields = z.infer<typeof formSchema>

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callback-url') || '/';
  console.log('Callback URL:', callbackUrl);



  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })


  async function onSubmit(values: FormFields) {
    setLoading(true);
    const response = await signIn('credentials', {
      callbackUrl: callbackUrl ?? '/',
      redirect: true,
      email: values.email,
      password: values.password
    })
    console.log(response);

    console.log(values)
    setLoading(false);
  }


  return <>
    <Card className="p-6 w-sm">

      <Form {...form}>
        {searchParams.get('error') ? <p className="py-3 text-destructive text-center">Incorrect Email or Password!</p> : ''}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="Huda@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder="Huda@123" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button type="submit" className="cursor-pointer w-full flex items-center justify-center gap-2">
            {loading && <Loader className="animate-spin h-5 w-5" />}
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
        <h4>Forget your Password?
          <Link href={'/forgetPassword'} className="text-blue-700">{' '}Reset</Link>
        </h4>
      </Form>
    </Card>
  </>

}