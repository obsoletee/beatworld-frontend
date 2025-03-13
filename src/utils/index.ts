export const formatTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const remainingSeconds = Math.floor(duration % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
