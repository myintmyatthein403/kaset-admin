import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-login.hook";
import { type LoginSchemaType, loginSchema } from "@/common/schemas/login.schema";
import { X, EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from '@tanstack/react-form'
import { Toaster } from "@/components/ui/sonner";
import { toast } from 'sonner'
import { InputField } from "@/components/custom/input/input-field";
import { ModeToggle } from "@/components/custom/button/mode-toggle";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    } as LoginSchemaType,
    validators: {
      onChange: loginSchema
    },
    onSubmit: async ({ value }) => {
      try {
        await login.mutateAsync(value);
      } catch (err: any) {
        form.reset();
        toast(err.response?.data?.message || err.meesage, {
          action: {
            label: (
              <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={16} /> {/* Use your X icon component */}
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
          <CardTitle className="text-center text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Log in to your account to continue
          </CardDescription>
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
                <InputField field={field} title="Email" placeholder='m@example.com' type="email" />
              )
              }
            </form.Field>

            {/* Password Field */}
            <form.Field name="password">
              {(field) => (
                <div className="grid gap-2 relative">
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    id={field.name}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="rounded-md pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-8 text-muted-foreground hover:text-foreground focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {!field.state.meta.isValid && field.state.meta.errors?.[0]?.message && (
                    <p className="text-sm text-red-500">{field.state.meta.errors[0]?.message}</p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Remember Me */}
            <form.Field name="rememberMe">
              {(field) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(!!checked)}
                  />
                  <Label htmlFor="rememberMe">Remember me</Label>
                </div>
              )}
            </form.Field>

            {/* Submit Button */}
            <Button type="submit" className="w-full rounded-md" disabled={login.isPending}>
              {login.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
          <ModeToggle />
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="/auth/register" className="text-primary hover:underline">
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>

      <Toaster position='top-center' />
    </div>
  );
};
