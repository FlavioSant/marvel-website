interface Comic {
  id: number;
  title: string;
  description: string;
  characters: {
    available: number;
    returned: number;
    items: { name: string }[];
  }[];
  creators: {
    available: number;
    returned: number;
    items: {
      resourceURI: string;
      name: string;
      role: string;
    }[];
  };
  format: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
