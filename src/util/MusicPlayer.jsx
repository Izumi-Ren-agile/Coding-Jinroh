import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MusicPlayer = () => {
  const location = useLocation();
  const [audio, setAudio] = useState(null);

  // ルーティングに応じた音楽ファイルを設定
  useEffect(() => {
    let audioFile;
    switch (location.pathname) {
      case '/page1':
        audioFile = '/path/to/music1.mp3';
        break;
      case '/page2':
        audioFile = '/path/to/music2.mp3';
        break;
       
      case '/page3':
        const N = 3;
        const randomInt = Math.floor(Math.random() * N);
        console.log(randomInt); // 例:  (0から3の間の整数)
        if(randomInt === 3){
          audioFile =  '/path/to/music3.mp3'; 
        }else if(randomInt === 1){
          audioFile =  '/path/to/music3.mp3'; 
        }else if(randomInt === 2){

        }
      //case文の追加でいくらでもルーティングを増やせる。
      default:
        audioFile = '/path/to/default-music.mp3';
    }

    // 既存のオーディオがあれば停止
    if (audio) {
      audio.pause();
    }

    
    // 新しいオーディオを作成
    const newAudio = new Audio(audioFile);
    setAudio(newAudio);
    newAudio.play();

    return () => {
      // コンポーネントがアンマウントされるときにオーディオを停止
      newAudio.pause();
    };
  }, [location.pathname]);

  return null; // このコンポーネントはUIを持たない
};

export default MusicPlayer;
