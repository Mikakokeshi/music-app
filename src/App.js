
import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/SongList";
import spotify from "./lib/spotify";
import { Player } from "./components/Player";

export default function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [popularSongs, setPopularSongs] = useState([])
  const [isPlay, setIsPlay] = useState(false)
  const [selectedSong, setSelectedSong] = useState()
  const audioRef = useRef(null)

  // spotify.test()
  useEffect(()=>{
    fetchPopularSongs();
  },[]);

  const fetchPopularSongs = async ()=> {
    setIsLoading(true);
    const result = await spotify.getPopularSongs();
    const popularSongs = result.items.map((item)=>{
      return item.track;
    })
    setPopularSongs(popularSongs);
    setIsLoading(false);

    console.log('popularSongs', popularSongs);
    console.log('result',result.items);
  } 

  const handleSongsSelected = async (song) =>{
    console.log(song)
    setSelectedSong(song);
    audioRef.current.src = song.preview_url;
    playSong();

  }

  const playSong = () => {
    audioRef.current.play();
    setIsPlay(true);
  }

  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlay(false);
  }

  const toggleSong = () => {
    if(isPlay){
      pauseSong();
    }else{
      playSong();
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-400 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList isLoading={isLoading} songs={popularSongs} onSongSelected={handleSongsSelected}/>
        </section>
      </main>
      {selectedSong != null &&  <Player song={selectedSong} isPlay={isPlay} onButtonClick = {toggleSong} />}
      
      <audio ref={audioRef}/>
    </div>
  );
}