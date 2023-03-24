export interface BoardGame {
  id: string;
  publishedYear: number;
  minPlayerNum: number;
  maxPlayerNum: number;
  playingTime: number;
  minPlayTime: number;
  maxPlayTime: number;
  age: number;
  name: string;
  koreanName?: string;
  thumbnail: string;
  image: string;
}

export interface UserBoardGame {
  id: string;
  total: number;
  rental: number;
}
