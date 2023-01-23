interface Comic {
  id: number;
  title: string;
  characters: {
    available: number;
    returned: number;
    items: { name: string }[];
  }[];
  creators: {
    available: number;
    returned: number;
    items: {
      name: string;
      role: string;
    }[];
  }[];
  format: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
