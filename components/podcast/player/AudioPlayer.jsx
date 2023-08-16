'use client';

import { useAudioPlayer } from '@/components/podcast/AudioProvider';
import { ForwardButton } from '@/components/podcast/player/ForwardButton';
import { MuteButton } from '@/components/podcast/player/MuteButton';
import { PlayButton } from '@/components/podcast/player/PlayButton';
import { PlaybackRateButton } from '@/components/podcast/player/PlaybackRateButton';
import { RewindButton } from '@/components/podcast/player/RewindButton';
import { Slider } from '@/components/podcast/player/Slider';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

function parseTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds - hours * 3600) / 60);
  seconds = seconds - hours * 3600 - minutes * 60;
  return [hours, minutes, seconds];
}

function formatHumanTime(seconds) {
  let [h, m, s] = parseTime(seconds);
  return `${h} hour${h === 1 ? '' : 's'}, ${m} minute${
    m === 1 ? '' : 's'
  }, ${s} second${s === 1 ? '' : 's'}`;
}

export function AudioPlayer() {
  let player = useAudioPlayer();

  let wasPlayingRef = useRef(false);

  let [currentTime, setCurrentTime] = useState(player.currentTime);

  useEffect(() => {
    setCurrentTime(null);
  }, [player.currentTime]);

  if (!player.meta) {
    return null;
  }

  return (
    <div className="flex items-center gap-6 bg-white dark:bg-stone-950 px-4 py-4 shadow shadow-slate-200/80 ring-1 ring-slate-900/5 backdrop-blur-sm md:px-6">
      <div className="hidden md:block">
        <PlayButton player={player} />
      </div>
      <div className="mb-[env(safe-area-inset-bottom)] flex flex-1 flex-col gap-3 overflow-hidden p-1">
        <Link
          href={player.meta.link}
          className="truncate text-center text-sm font-bold leading-6 md:text-left"
          title={player.meta.title}
        >
          {player.meta.title}
        </Link>
        <div className="flex justify-between gap-6">
          <div className="flex items-center md:hidden">
            <MuteButton player={player} />
          </div>
          <div className="flex flex-none items-center gap-4">
            <RewindButton player={player} />
            <div className="md:hidden">
              <PlayButton player={player} />
            </div>
            <ForwardButton player={player} />
          </div>
          <Slider
            label="Current time"
            maxValue={player.duration}
            step={1}
            value={[currentTime ?? player.currentTime]}
            onChange={([v]) => setCurrentTime(v)}
            onChangeEnd={(value) => {
              player.seek(value);
              if (wasPlayingRef.current) {
                player.play();
              }
            }}
            numberFormatter={{ format: formatHumanTime }}
            onChangeStart={() => {
              wasPlayingRef.current = player.playing;
              player.pause();
            }}
          />
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <PlaybackRateButton player={player} />
            </div>
            <div className="hidden items-center md:flex">
              <MuteButton player={player} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
