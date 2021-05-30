export interface ArtistImageProps {
  height: number;
  url: string;
  width: number;
}

export interface ArtistProps {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null | string;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: ArtistImageProps[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}
