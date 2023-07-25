// types.ts
export interface Gif {
    id: string;
    url: string;
    title: string;
  }
  
  export interface GifData {
    images: {
      fixed_height: {
        url: string;
      };
    };
    title: string;
  }
  
  export interface ApiResponse {
    data: GifData[];
  }
  