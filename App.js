import "./App.css";
import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function App() {
  const [musicUpload, setMusicUpload] = useState(null);
  const [musicUrls, setMusicUrls] = useState([]);

  const musicListRef = ref(storage, "music/");
  const uploadFile = () => {
    if (musicUpload == null) return;
    const musicRef = ref(storage, `music/${musicUpload.name + v4()}`);
    uploadBytes(musicRef, musicUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setMusicUrls((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(musicListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setMusicUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setMusicUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Music</button>
      {musicUrls.map((url) => {
        return (
          
         
              <AudioPlayer
                autoPlay
                src={url} 
                
               
                
              />
         
        )
        
      
      })}
    </div>
  );
}

export default App;