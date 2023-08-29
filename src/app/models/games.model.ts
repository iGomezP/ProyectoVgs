export interface GamesModel {
  name: string;
  platforms: [];
  price: number;
  rating: number;
  releaseYear: Date;
  genres: [];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  actualStatus: string;
  summary: string;
  slug: string;
  screenshots: [];
  publishers: [];
  stock: number;
  coverImage: string;
}
