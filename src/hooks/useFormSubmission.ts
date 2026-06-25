"use client";

import { startTransition, useRef } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
} from "react-hook-form";

export function useFormSubmission<T extends FieldValues>(
  defaultValues: DefaultValues<T>,
  submitAction: (formData: FormData) => void,
) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({
    defaultValues,
    mode: "onChange",
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = handleSubmit(() => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    startTransition(() => {
      submitAction(formData);
    });
  });

  return {
    control,
    register,
    reset,
    formRef,
    onSubmit,
    errors,
    isValid,
  };
}