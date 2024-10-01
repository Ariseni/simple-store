"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget
      .elements as typeof e.currentTarget.elements & {
      usernameInput: HTMLInputElement;
      passwordInput: HTMLInputElement;
    };
    const res = await signIn("credentials", {
      redirect: false,
      username: elements.usernameInput.value,
      password: elements.passwordInput.value,
    });

    if (res?.error) {
      setMessage(res.error);
    } else {
      setMessage("Sign in successful!");
      // Optionally, you can redirect the user after a successful sign-in
      router.push("/cart");
    }
  };

  return (
    <div className="flex flex-col h-full bg-red-500 mt-20">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            id="usernameInput"
            type="text"
            required
            defaultValue="emilys"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            id="passwordInput"
            type="password"
            required
            defaultValue="emilyspass"
          />
        </div>
        <button type="submit">Sign In</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
