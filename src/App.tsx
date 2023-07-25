// App.tsx
import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import GifList from './components/GifList';
import { Gif, ApiResponse, GifData } from './types';
import './styles.css';

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);

  const handleSearch = (query: string) => {
    const apiKey = 'sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh';
    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=10`;

    axios
      .get<ApiResponse>(url)
      .then((response) => {
        const gifsData = response.data.data;
        console.log(gifsData)
        const gifsList: Gif[] = gifsData.map((gifData: GifData) => ({
          id: gifData.title,
          url: gifData.images.fixed_height.url,
          title: gifData.title,
        }));
        setGifs(gifsList);
      })
      .catch((error) => {
        console.error('Error fetching GIFs:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="title">GIF Search </h1>
      <div className="search-container">
        <SearchForm onSearch={handleSearch} />
      </div>
      <GifList gifs={gifs} />
    </div>
  );
};

export default App;
