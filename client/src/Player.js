import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      //everytime we not playing => play to false
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      //set to true after we select a song
      play={play}
      //we need to pass an array
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
