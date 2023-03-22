export interface Attribute {
  _attributes: {
    objectId: string;
  }
  _text: string;
}

export interface Text {
  _text: string;
}

export interface BoardGameResponse {
  _attributes: {
    objectid: string;
  },
  yearpublished: Text;
  minplayers: Text;
  maxplayers: Text;
  playingtime: Text;
  minplaytime: Text;
  maxplaytime: Text;
  age: Text;
  name: {
    _attributes: {
      primary?: string;
      sortindex: string;
    }
    _text: string;
  }[]
  descriptions: string;
  thumbnail: Text;
  image: Text;
  boardgamepublisher: Attribute[];
  boardgameartist: Attribute[];
  boardgamecategory: Attribute[];
  boardgamemechanic: Attribute[];
}

export interface BoardgameSearchResponse {
  boardgames: {
    boardgame: BoardGameResponse[];
  }
}

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
