"use client";

import { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import styles from "./AddStoryViewer.module.css";

type Props = {
  onClose: () => void;
};

export default function AddStoryViewer({ onClose }: Props) {
  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log({
      header,
      subHeader,
    });

    // Later:
    // RHF + useActionState + Server Action
  }

  return (
    <div className={styles.overlay}>
      <header className={styles.header}>
        <h2 className={styles.title}>Create Story</h2>

        <button type="button" onClick={onClose} className={styles.closeButton}>
          <CloseIcon sx={{ fontSize: 22 }} />
        </button>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <section className={styles.fields}>
          <TextField
            className={styles.textField}
            label="Title (optional)"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            fullWidth
          />

          <TextField
            className={styles.textField}
            label="Subtitle (optional)"
            value={subHeader}
            onChange={(e) => setSubHeader(e.target.value)}
            fullWidth
          />
        </section>

        <section className={styles.uploadSection}>
          <div className={styles.uploadContainer}>
            <ImageOutlinedIcon
              sx={{
                fontSize: 56,
                color: "var(--primary)",
              }}
            />

            <div className={styles.uploadContent}>
              <h3 className={styles.uploadTitle}>Story Image</h3>

              <p className={styles.uploadSubtitle}>
                Upload a photo for your story.
                <br />
                Supported formats: PNG, JPG, WEBP.
              </p>
            </div>

            <Button
              variant="contained"
              startIcon={<CloudUploadRoundedIcon />}
              sx={{
                mt: 2,
                px: 3,
                py: 1,

                borderRadius: 0,

                textTransform: "none",
                fontWeight: 700,

                backgroundColor: "var(--primary)",

                "@media (hover: hover) and (pointer: fine)": {
                  "&:hover": {
                    backgroundColor: "var(--primary-300)",
                  },
                },

                "@media (hover: none)": {
                  "&:active": {
                    backgroundColor: "var(--primary-300)",
                  },
                },
              }}
            >
              Choose Image
            </Button>
          </div>
        </section>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            py: 1.4,

            textTransform: "none",
            fontWeight: 700,
            borderRadius: 0,
            backgroundColor: "var(--primary)",

            "@media (hover: hover) and (pointer: fine)": {
              "&:hover": {
                backgroundColor: "var(--primary-300)",
              },
            },

            "@media (hover: none)": {
              "&:active": {
                backgroundColor: "var(--primary-300)",
              },
            },
          }}
        >
          Publish Story
        </Button>
      </form>
    </div>
  );
}
