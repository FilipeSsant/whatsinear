import { useEffect, useState } from "react";
import { MdLink, MdNearMe, MdPause, MdPlayArrow } from "react-icons/md";
import { toast } from "react-toastify";
import { FabButton } from "../FabButton";
import styles from "./styles.module.scss";

interface CardProps {
  handleClick?: () => void;
  cover?: string;
  coverText?: string;
  title: string;
  description?: string;
  position?: number;
  share?: {
    text: string;
    uri: string;
  };
  linkToGo?: string;
  preview?: string;
}

export function Card({
  cover,
  coverText,
  title,
  description,
  position,
  share,
  linkToGo,
  preview,
  handleClick = () => {},
}: CardProps) {
  const [audio] = useState(typeof Audio !== "undefined" && new Audio(preview));
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const audioToggle = () => setIsAudioPlaying((prevState) => !prevState);

  useEffect(() => {
    isAudioPlaying ? audio.play() : audio.pause();
  }, [isAudioPlaying]);

  useEffect(() => {
    audio.addEventListener("ended", () => setIsAudioPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setIsAudioPlaying(false));
    };
  }, []);

  return (
    <div onClick={() => handleClick()} className={styles.cardContainer}>
      {position && (
        <FabButton className={styles.positionFabButton}>
          <span>#{position}</span>
        </FabButton>
      )}

      <div className={styles.cardCoverContainer}>
        <img src={cover} alt="artist" />
        {coverText && (
          <div className={styles.cardCoverTextContainer}>
            <strong>{coverText}</strong>
          </div>
        )}
        {share && (
          <FabButton
            onClick={() => {
              navigator.clipboard.writeText(share.text);
              return toast("Time to share 🥳");
            }}
            className={styles.leftFabButton}>
            <MdLink size={24} />
          </FabButton>
        )}
        {linkToGo && (
          <FabButton
            onClick={() => {
              window.open(linkToGo, "_blank");
            }}
            className={styles.rightFabButton}>
            <MdNearMe size={24} />
          </FabButton>
        )}
        {preview && (
          <FabButton
            onClick={() => audioToggle()}
            className={styles.rightFabButton}>
            {isAudioPlaying ? <MdPause size={24} /> : <MdPlayArrow size={24} />}
          </FabButton>
        )}
      </div>

      <div className={styles.cardInformationContainer}>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  );
}
