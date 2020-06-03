import React, { useState, useEffect } from "react";
import { MusicController } from "adventure-component-library";
import axios from 'axios';

//var userAddress;




const sendAPIRequest = (walletAddress) => {
  console.log("userAddress API BF: " + JSON.stringify(walletAddress));

  window.alert('Obtained 5 BEAR Token');
  var apiAddress;
  apiAddress = "http://13.56.163.182:8000/transfer-token";
  axios.post(apiAddress, {
      ticker: "BEAR",
      amount: 5,
      to: walletAddress,
      hookUrl: "done",
  })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
}



const songData = {
  "we used to talk every night": {
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song1.mp3",
    songName: "we used to talk every night",
    artist: "elijah who",
  },
  "Be Mine": {
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song2.mp3",
    songName: "Be Mine",
    artist: "Jazzinuf",
  },
  "feelin' fine": {
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song3.mp3",
    songName: "feelin' fine",
    artist: "elijah who",
  },
  "Thunderbolt 404": {
    songName: "Thunderbolt 404",
    artist: "letsruntrack",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song4.mp3",
  },
  blue: {
    songName: "blue",
    artist: "jinsang x l o k a",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song5.mp3",
  },
  "Silent Thoughts": {
    songName: "Silent Thoughts",
    artist: "GentleBeatz ",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song6.mp3",
  },
  Return: {
    songName: "Return",
    artist: "Mingu5",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song7.mp3",
  },
  "put me back in my dream": {
    songName: "put me back in my dream",
    artist: "DOMINANT",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song8.mp3",
  },
  "Moonlit Metro": {
    songName: "Moonlit Metro",
    artist: "Cantrip",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song9.mp3",
  },
  "venice venture": {
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song10.mp3",
    songName: "venice venture",
    artist: "big wild",
  },
  // 11 12 13 unnamed
  "penthouse suite": {
    songName: "penthouse suite",
    artist: "bonus points",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song14.mp3",
  },
  "dejitaru glow": {
    songName: "dejitaru glow",
    artist: "a.l.i.s.o.n, crystal cola",
    url:
      "https://token-metadata.s3-us-west-1.amazonaws.com/SS2/audio/song15.mp3",
  },
};

//////////// ^song info  ////////////




const songArr = Object.values(songData);

const MyComponent = (props) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [songPlayingIndex, setSongPlayingIndex] = useState(0);
  const song = songArr[songPlayingIndex];
  const [audio, setAudio] = useState(new window.Audio(song.url));
  console.log("MyComp log: " + JSON.stringify(props.walletAddress));
  console.log("props log: " + props);


  const onClickPrevSong = () => {
    let newSongIndex = songPlayingIndex - 1;
    if (newSongIndex < 0) {
      newSongIndex = songArr.length - 1;
    }
    setSongPlayingIndex(newSongIndex);
  };

  const onClickNextSong = () => {
    let newSongIndex = songPlayingIndex + 1;
    if (newSongIndex >= songArr.length) {
      newSongIndex = 0;
    }
    setSongPlayingIndex(newSongIndex);
  };

  
  /////// onEndAudio Func ///////
  const onEndAudio = () => {
    console.log("onEndAudio song ended")
    sendAPIRequest(props.walletAddress);
    onTogglePlaySong();
  };

  useEffect(() => {
    audio.addEventListener("ended", onEndAudio);
    return () => onEndAudio;
  }, []);
  ///////////////////////////////






// Pause ===> unPause
  const onTogglePlaySong = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    }
    if (!isPlaying) {
      audio.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (isPlaying) {
      audio.src = songArr[songPlayingIndex].url;
      audio.play();
    }
  }, [songPlayingIndex]);

  return (
    <div style={{ background: "blue", color: "white" }}>
      <MusicController
        isPlaying={isPlaying}
        onClickPrev={onClickPrevSong}
        onClickNext={onClickNextSong}
        onTogglePlay={onTogglePlaySong}
        song={songArr[songPlayingIndex]}      
      />
    </div>
  );
};

export default MyComponent;
