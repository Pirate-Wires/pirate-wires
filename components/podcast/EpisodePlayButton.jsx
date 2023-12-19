"use client";

import { useAudioPlayer } from "./AudioProvider";
import { useMemo } from "react";

export function EpisodePlayButton({ episode, playing, paused, ...props }) {
  let audioPlayerData = useMemo(
    () => ({
      title: episode.title,
      audio: {
        src: episode.audio.src,
        type: episode.audio.type,
      },
      link: `/${episode.id}`,
    }),
    [episode],
  );
  let player = useAudioPlayer(audioPlayerData);

  return (
    <button
      type="button"
      onClick={() => player.toggle()}
      aria-label={`${player.playing ? "Pause" : "Play"} episode ${episode.title}`}
      {...props}>
      {player.playing ? playing : paused}
    </button>
  );
}
