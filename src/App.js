
import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/SongList";
import spotify from "./lib/spotify";
import { Player } from "./components/Player";
import { SearchInput } from "./components/SearchInput";

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState();
  const [keyword, setKeyword] = useState("");
  const [searchedSongs, setSearchedSongs] = useState();
  const audioRef = useRef(null);
  const isSearchedResult = searchedSongs != null;

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
    if(song.preview_url != null ){
      setSelectedSong(song);
      audioRef.current.src = song.preview_url;
      playSong();
    }else{
      pauseSong();
    }
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

  const handleInputChange = (e) =>{
    setKeyword(e.target.value);
  }

  const searchSongs = async () => {
    setIsLoading(true);
    const result =  await spotify.searchSongs(keyword);
    setSearchedSongs(result.items)
    console.log('result',result)
    console.log('result items',result.items)
    console.log('result items songs',result.items.songs)
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-400 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs}/>

        <section>
          <h2 className="text-2xl font-semibold mb-5">{isSearchedResult? 'Searched result':'Popular Songs'}</h2>
          <SongList isLoading={isLoading} songs={isSearchedResult? searchedSongs : popularSongs} onSongSelected={handleSongsSelected}/>
        </section>
      </main>
      {selectedSong != null &&  <Player song={selectedSong} isPlay={isPlay} onButtonClick = {toggleSong} />}
      
      <audio ref={audioRef}/>
    </div>
  );
}