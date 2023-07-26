import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm';
import GifList from './components/GifList';
import { Gif, ApiResponse, GifData } from './types';
import './styles.css';

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [page, setPage] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<boolean>(false);

  useEffect(() => {
    handleSearch('');
  }, []); // Initial search with an empty query to load initial GIFs

  const handleSearch = (query: string) => {
    const apiKey = 'sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh';
    const limit = 10;
    const offset = (page - 1) * limit;

    const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

    axios
      .get<ApiResponse>(url)
      .then((response) => {
        const gifsData = response.data.data;
        const gifsList: Gif[] = gifsData.map((gifData: GifData) => ({
          id: gifData.title,
          url: gifData.images.fixed_height.url,
          title: gifData.title,
        }));

        // Append new GIFs to the existing list
        setGifs((prevGifs) => [...prevGifs, ...gifsList]);
        loadingRef.current = false; // Reset the loading flag
      })
      .catch((error) => {
        console.error('Error fetching GIFs:', error);
        loadingRef.current = false; // Reset the loading flag in case of an error
      });
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !loadingRef.current) {
      // Load more GIFs when user reaches the bottom and not already loading
      loadingRef.current = true; // Set the loading flag to prevent multiple requests
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    // Create an IntersectionObserver to watch the container element
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="container">
      <h1 className="title">GIF Search App</h1>
      <div className="search-container">
        <SearchForm onSearch={handleSearch} />
      </div>
      <GifList gifs={gifs} />
      <div ref={containerRef} />
    </div>
  );
};

export default App



