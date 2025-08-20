import { Button } from "@/src/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/src/common/components/ui/card";
import { X } from "lucide-react";
import { useForm } from '@tanstack/react-form'
import { Toaster } from "@/src/common/components/ui/sonner";
import { toast } from 'sonner'
import { InputField, PasswordField } from "@/src/common/components/custom/input/input-field";
import { ModeToggle } from "@/src/common/components/custom/button/mode-toggle";
import { useRegister } from "@/src/common/hooks/user-register.hook";
import { type RegisterSchemaType, registerSchema } from "@/src/common/schemas/register.schema";

export const RegisterPage = () => {
  const register = useRegister()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    } as RegisterSchemaType,

    validators: {
      onChange: registerSchema
    },

    onSubmit: async ({ value }) => {
      try {
        await register.mutateAsync(value); // Use the register hook
      } catch (err: any) {
        form.reset();
        toast(err.response?.data?.message || err.meesage, {
          action: {
            label: (
              <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={16} />
              </span>
            ),
            onClick: () => console.log("Undo"),
          },
        })
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md rounded-xl shadow-lg dark:shadow-none">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Create an Account</CardTitle> {/* Changed title */}
          <CardDescription className="text-center text-muted-foreground">
            Sign up now to get started
          </CardDescription> {/* Changed description */}
        </CardHeader>

        <CardContent>
          <form onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit(e)
          }} className="space-y-6">
            {/* Email Field */}
            <form.Field name="email">
              {(field) => (
                <InputField field={field} title="Email" placeholder='m@example.com' type="email" required />
              )
              }
            </form.Field>

            <form.Field name="name">
              {(field) => (
                <InputField field={field} title="Name" placeholder='Enter your name' required />
              )
              }
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <PasswordField field={field} title="Password" required />
              )}
            </form.Field>

            {/* Confirm Password Field - New Section */}
            <form.Field name="confirmPassword">
              {(field) => (
                <PasswordField field={field} title="Confirm Password" required />
              )}
            </form.Field>

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-md" disabled={register.isPending}>
              {register.isPending ? 'Signing Up...' : 'Sign Up'} {/* Changed button text */}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <ModeToggle />
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Log in
            </a> {/* Changed link text */}
          </p>
        </CardFooter>
      </Card>

      <Toaster position='top-center' />
    </div>
  );
};
