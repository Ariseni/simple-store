import React from "react";

type LabelInputProps<T extends string | number> = {
  label: string;
  value?: T;
  setValue: (value: T) => void;
  inputId?: string;
};

export function LabelInput<T extends string | number>({
  label,
  value,
  inputId,
  setValue,
}: LabelInputProps<T>) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;

    const parsedValue =
      typeof value === "number" ? parseFloat(inputValue) : inputValue;

    setValue(parsedValue as T);
  }

  return (
    <div className="flex-1">
      <label className="block text-gray-700 font-semibold">{label}</label>
      <input
        id={inputId}
        type={typeof value === "number" ? "number" : "text"}
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
