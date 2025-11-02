"use client";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

const Audio = ({className}: {className?: string}) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className={` flex-col items-center justify-center ${className}`}>
            <audio ref={audioRef} src="/audio/birds.mp3" />

            <button
                onClick={togglePlay}
                className="group relative flex items-center justify-center rounded-full cursor-pointer"
            >
                <span className="relative z-10 text-white font-semibold">
                    {isPlaying ?
                        <Pause className="text-primary me-1"/>
                        :
                        <Play className="text-primary me-1"/>
                        }
                </span>
            </button>
        </div>
    );
};

export default Audio;
