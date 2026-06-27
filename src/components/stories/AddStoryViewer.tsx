"use client";

import CloseIcon from "@mui/icons-material/Close";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { Controller } from "react-hook-form";

import styles from "./AddStoryViewer.module.css";

import useActions from "@/hooks/useActions";
import { useFormSubmission } from "@/hooks/useFormSubmission";

import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  onClose: () => void;
};

type StoryForm = {
  header: string;
  subHeader: string;
  image: FileList;
};

export default function AddStoryViewer({ onClose }: Props) {
  const actions = useActions();

  const { control, formRef, onSubmit, errors } = useFormSubmission<StoryForm>(
    {
      header: "",
      subHeader: "",
    },
    actions.stories.create.submitAction,
  );

  const { formState, isPending } = actions.stories.create;
  // preview mode
  const [preview, setPreview] = useState<string | null>(null);
  // preview button
  const [isPreviewing, setIsPreviewing] = useState(false);
  // header watch
  const [header, setHeader] = useState("");
  const [subHeader, setSubHeader] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      className={styles.overlay}
      style={
        preview
          ? {
              backgroundImage: `url(${preview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {!isPreviewing && !isPending && (
        <header className={styles.header}>
          <h2 className={styles.title}>Create Story</h2>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
          >
            <CloseIcon sx={{ fontSize: 22 }} />
          </button>
        </header>
      )}

      {/* form */}
      {isPending ? (
        <div className={styles.loadingOverlay}>
          <CircularProgress
            size={70}
            thickness={4}
            sx={{ color: "var(--primary)" }}
          />
        </div>
      ) : (
        <form
          ref={formRef}
          className={`${styles.form} ${preview ? styles.previewMode : ""}`}
          onSubmit={onSubmit}
          style={{
            display: isPreviewing ? "none" : "flex",
          }}
        >
          <section className={styles.fields}>
            <Controller
              name="header"
              control={control}
              rules={{
                maxLength: {
                  value: 80,
                  message: "Title cannot exceed 80 characters.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // keep RHF working
                    setHeader(e.target.value); // update preview
                  }}
                  spellCheck={false}
                  className={styles.textField}
                  label="Title (optional)"
                  fullWidth
                  error={!!errors.header}
                  helperText={errors.header?.message}
                />
              )}
            />

            <Controller
              name="subHeader"
              control={control}
              rules={{
                maxLength: {
                  value: 150,
                  message: "Subtitle cannot exceed 150 characters.",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setSubHeader(e.target.value);
                  }}
                  className={styles.textField}
                  spellCheck={false}
                  label="Subtitle (optional)"
                  fullWidth
                  error={!!errors.subHeader}
                  helperText={errors.subHeader?.message}
                />
              )}
            />
          </section>

          <section className={styles.uploadSection}>
            <div
              className={`${styles.uploadContainer} ${preview ? styles.previewModeCard : ""}`}
            >
              <ImageOutlinedIcon
                sx={{
                  fontSize: 56,
                  color: "var(--primary)",
                }}
              />

              <div className={styles.uploadContent}>
                <h3
                  className={`${styles.uploadTitle} ${preview ? styles.previewModeText : ""}`}
                >
                  Story Image
                </h3>

                <p
                  className={`${styles.uploadSubtitle} ${preview ? styles.previewModeText : ""}`}
                >
                  Upload a photo for your story.
                  <br />
                  Supported formats: PNG, JPG, WEBP.
                </p>
              </div>
              <Controller
                name="image"
                control={control}
                rules={{
                  validate: (files) => {
                    if (!files?.length) {
                      return "Please select an image.";
                    }

                    const file = files[0];

                    if (
                      !["image/png", "image/jpeg", "image/webp"].includes(
                        file.type,
                      )
                    ) {
                      return "Only PNG, JPG or WEBP images are allowed.";
                    }

                    if (file.size > 5 * 1024 * 1024) {
                      return "Image must be smaller than 5MB.";
                    }

                    return true;
                  },
                }}
                render={({ field: { onChange, ref } }) => (
                  <>
                    <input
                      ref={ref}
                      hidden
                      id="story-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      name="image"
                      onChange={(e) => {
                        const files = e.target.files;

                        onChange(files);

                        if (preview) {
                          URL.revokeObjectURL(preview);
                        }

                        if (files?.length) {
                          setPreview(URL.createObjectURL(files[0]));
                        } else {
                          setPreview(null);
                        }
                      }}
                    />

                    <label htmlFor="story-image">
                      <Button
                        component="span"
                        variant={preview ? "outlined" : "contained"}
                        startIcon={<CloudUploadRoundedIcon />}
                        sx={{
                          mt: 2,
                          px: 3,
                          py: 1,
                          borderRadius: 0,
                          textTransform: "none",
                          fontWeight: 700,
                          color: "var(--surface)",
                          borderColor: preview && "var(--primary-100)",

                          backgroundColor: preview
                            ? "var(--blur)"
                            : "var(--mono-black)",

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
                        {preview ? "Change Image" : "Choose Image"}
                      </Button>
                    </label>
                  </>
                )}
              />
            </div>
          </section>

          {formState.message && (
            <p className={styles.serverError}>{formState.message}</p>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={isPending}
            fullWidth
            sx={{
              mt: 2,
              py: 1.4,
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
            {isPending ? "Publishing..." : "Publish Story"}
          </Button>
        </form>
      )}
      {(isPreviewing || isPending) && (
        <div className={styles.storyText}>
          {header && <h2>{header}</h2>}

          {subHeader && <p>{subHeader}</p>}
        </div>
      )}
      {preview && (
        <Button
          type="button"
          variant="contained"
          onClick={() => setIsPreviewing((v) => !v)}
          sx={{
            position: "absolute",
            left: 16,
            bottom: 16,

            zIndex: 20,

            borderRadius: 0,

            textTransform: "none",
            fontWeight: 700,

            backgroundColor: "var(--blur)",
            backdropFilter: "blur(12px)",

            color: "white",

            "@media (hover: hover) and (pointer: fine)": {
              "&:hover": {
                backgroundColor: "var(--primary-300)",
              },
            },
          }}
        >
          {isPreviewing ? "Edit" : "Preview"}
        </Button>
      )}
      <div className={styles.errorContainer}>
        <p className={styles.error}>{errors.image?.message}</p>
      </div>
    </div>
  );
}
