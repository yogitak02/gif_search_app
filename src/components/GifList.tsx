import React from 'react';
import '../styles.css';
interface Gif {
  id: string;
  url: string;
  title: string;
}

interface GifListProps {
  gifs: Gif[];
}

const GifList: React.FC<GifListProps> = ({ gifs }) => {
  return (
    <div className="gif-list">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-item">
          <img className="gif-img" src={gif.url} alt={gif.title} />
         
        </div>
      ))}
    </div>
  );
};

export default GifList;
