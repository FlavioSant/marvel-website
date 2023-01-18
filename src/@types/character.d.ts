interface Character {
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}
