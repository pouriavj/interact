"use client";

import { useForm } from "react-hook-form";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import * as actions from "@/actions";

import styles from "./Login.module.css";
import PrimaryButton from "../PrimaryButton";

type FormValues = {
  email: string;
};

export default function EmailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();

    formData.append("email", data.email);

    await actions.signInWithEmail(formData);
  };
  const isBlocked = !isValid || isSubmitting;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <TextField
        fullWidth
        placeholder="Enter your email"
        error={!!errors.email}
        helperText={errors.email?.message}
        className={styles.textField}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email",
          },
        })}
      />

      <PrimaryButton
        fullWidth
        type="submit"
        className={styles.primaryButton}
        style={{
          pointerEvents: isBlocked ? "none" : "auto",
          opacity: isBlocked ? 0.4 : 1,
        }}
      >
        {isSubmitting ? "Sending..." : "Send Magic Link"}
      </PrimaryButton>
    </form>
  );
}
