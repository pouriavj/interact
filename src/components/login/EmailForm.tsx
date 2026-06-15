"use client";

import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as actions from "@/actions";

import styles from "./Login.module.css";

type FormValues = {
  email: string;
};

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting,
    },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (
    data: FormValues
  ) => {
    const formData = new FormData();

    formData.append("email", data.email);

    await actions.signInWithEmail(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <TextField
        fullWidth
        placeholder="Enter your email"
        error={!!errors.email}
        helperText={errors.email?.message}
        className={styles.textField}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value:
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:
              "Please enter a valid email",
          },
        })}
      />

      <Button
        fullWidth
        type="submit"
        disabled={!isValid || isSubmitting}
        className={styles.primaryButton}
      >
        {isSubmitting
          ? "Sending..."
          : "Send Magic Link"}
      </Button>
    </form>
  );
}