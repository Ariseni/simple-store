"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type LoginProps = {
  isDropdown: boolean;
};
export default function Login({ isDropdown }: LoginProps) {
  const [message, setMessage] = useState("");

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
    }
  };

  return (
    <div
      className={`flex flex-col p-5 mt-5 bg-white rounded-bl-lg bg-[#] ${
        isDropdown ? "absolute" : ""
      } right-0 shadow-2xl z-10`}
    >
      <form onSubmit={handleSubmit} className="flex gap-5 flex-col">
        <InputWithLabel
          text="Username"
          defaultValue="emilys"
          id="usernameInput"
        />
        <InputWithLabel
          text="Password"
          defaultValue="emilyspass"
          id="passwordInput"
        />
        <button type="submit" className="bg-blue-500 rounded-md py-4">
          Sign In
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

type InputWithLabelProps = {
  text: string;
  defaultValue: string;
  id: string;
};
export const InputWithLabel = ({
  text,
  defaultValue,
  id,
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-col w-full gap-1 justify-between items-start">
      <label className="font-semibold">{text}</label>
      <input
        id={id}
        type="text"
        required
        defaultValue={defaultValue}
        className="w-full"
      />
    </div>
  );
};
