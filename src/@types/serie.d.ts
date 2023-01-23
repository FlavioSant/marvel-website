interface Serie {
  id: number;
  title: string;
  description: string | null;
  startYear: number;
  endYear: number;
  characters: {
    available: number;
    returned: number;
    items: { name: string }[];
  }[];
  creators: {
    name: string;
    role: string;
  }[];
  rating: string;
  type: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
