"use client";

import { useEffect, useState } from "react";
import styles from "./StoryProgress.module.css";

export default function StoryProgress({
  duration,
  onFinish,
}: {
  duration: number;
  onFinish: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();

    let frame: number;

    const animate = (time: number) => {
      const percent = Math.min(
        ((time - start) / duration) * 100,
        100
      );

      setProgress(percent);

      if (percent < 100) {
        frame = requestAnimationFrame(animate);
      } else {
        onFinish();
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [duration, onFinish]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.bar}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}