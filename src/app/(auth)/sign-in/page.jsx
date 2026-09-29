"use client";

import { signIn } from "@/lib/auth-client";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log("form er data", data);

    const { data: restData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      remember: true,
      callbackURL: "/",
    });

    console.log(restData, error);

    // alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    
    <div className="flex justify-center  mt-10 container mx-auto items-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Sign In</h1>
        <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }

          return null;
        }}
      >
        <Label>Email</Label>
        <Input placeholder="Enter your email" />
        <FieldError />
      </TextField>

      <TextField className="w-full max-w-[280px]" name="password">
        <Label>Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-full max-w-[280px]"
            type={isVisible ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Enter your password"
          />
          <InputGroup.Suffix className="pe-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeSlash className="size-4" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>

      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button> or
        <Link href="/sign-up" className="bg-blue-500 px-3 py-2 rounded-3xl text-sm hover:bg-blue-800">Sign Up</Link>
      </div>
    </Form>
    </div>
  );
}
