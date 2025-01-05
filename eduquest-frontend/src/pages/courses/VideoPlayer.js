import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoPlayer = ({ videoUrl, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = (e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
    setCurrentTime(video.currentTime);

    // Mark video as completed when 95% watched
    if (progress >= 95 && !isCompleted) {
      setIsCompleted(true);
      onComplete && onComplete();
    }
  };

  const handleVideoClick = () => {
    const video = document.getElementById('course-video');
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleProgressClick = (e) => {
    const video = document.getElementById('course-video');
    const progressBar = document.getElementById('progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / progressBar.offsetWidth;
    video.currentTime = pos * video.duration;
  };

  return (
    <div className="relative bg-gray-900 rounded-xl overflow-hidden">
      {/* Video */}
      <video
        id="course-video"
        className="w-full aspect-video"
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onClick={handleVideoClick}
        muted={isMuted}
      >
        Your browser does not support the video tag.
      </video>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
        {/* Progress Bar */}
        <div
          id="progress-bar"
          className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-purple-600 rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-400 rounded-full shadow-lg" />
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={handleVideoClick}
              className="text-white hover:text-purple-400"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </button>

            {/* Mute */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-white hover:text-purple-400"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6" />
              ) : (
                <Volume2 className="h-6 w-6" />
              )}
            </button>

            {/* Time */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Completion Status */}
          {isCompleted && (
            <div className="text-green-400 text-sm">
              Video Completed ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;