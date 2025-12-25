"use client";

import React, { FC, FormEvent, useEffect, useState } from "react";
import { FieldConfig } from "../type";
import Button from "./Button";
import Input from "./Input";

type Props<T> = {
  fields: FieldConfig<T>[];
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  submitLabel?: string;
};

type Errors<T> = Partial<Record<keyof T | "global", string>>;

function Form<T extends Record<string, any>>({
  fields,
  initialValues,
  onSubmit,
  submitLabel = "Submit",
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleChange = (name: keyof T, value: string) => {
    setValues((pre) => ({ ...pre, [name]: value }));
    if (errors[name]) {
      setErrors((pre) => ({ ...pre, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Errors<T> = {};

    fields.forEach((field) => {
      const val = values[field.name];

      if (field.required) {
        if (val === null || val === undefined || val === "") {
          newErrors[field.name] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      await onSubmit(values);
    } catch (error: any) {
      if (typeof error === "object" && error !== null && !error.message) {
        setErrors(error as Errors<T>);
      } else {
        const msg = error?.message || "Unexpacted error occurred";
        setErrors((pre) => ({ ...pre, global: msg }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.global && (
        <div className="alert alert-error text-sm">{errors.global}</div>
      )}

      {fields.map((field) => (
        <Input
          key={String(field.name)}
          label={field.label}
          type={field.type || "text"}
          placeholder={field.placeholder}
          value={String(values[field.name] ?? "")}
          error={errors[field.name]}
          onChange={(value) => handleChange(field.name, value)}
        />
      ))}

      <Button type="submit" isLoading={loading}>
        {submitLabel}
      </Button>
    </form>
  );
}

export default Form;
