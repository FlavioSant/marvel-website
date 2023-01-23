interface Character {
  id: number;
  modified: string;
  name: string;
  description: string;
  resourceURI: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}
