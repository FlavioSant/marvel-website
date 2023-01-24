interface Creator {
  id: number;
  firstName: string;
  fullName: string;
  lastName: string;
  middleName: string;
  suffix: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}
