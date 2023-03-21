import {BoardGame, BoardGameResponse} from './types';

const isKorean = (text: string) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

export const toBoardGame = (boardGameResponse: BoardGameResponse): BoardGame => {
  const {
    _attributes: {
      objectid: id,
    },
    yearpublished: {
      _text: publishedYear,
    },
    minplayers: {
      _text: minPlayerNum,
    },
    maxplayers: {
      _text: maxPlayerNum,
    },
    playingtime: {
      _text: playingTime,
    },
    minplaytime: {
      _text: minPlayTime,
    },
    maxplaytime: {
      _text: maxPlayTime,
    },
    age: {
      _text: age,
    },
    name: nameCandidates,
    thumbnail: {
      _text: thumbnail,
    },
    image: {
      _text: image,
    },
  } = boardGameResponse;

  const name = nameCandidates.find(({_attributes}) => Boolean(_attributes.primary))?._text || '';
  const koreanName = nameCandidates.find(({_text}) => isKorean(_text))?._text;
  return {
    id,
    publishedYear: Number(publishedYear),
    maxPlayerNum: Number(maxPlayerNum),
    minPlayerNum: Number(minPlayerNum),
    playingTime: Number(playingTime),
    maxPlayTime: Number(maxPlayTime),
    minPlayTime: Number(minPlayTime),
    age: Number(age),
    name,
    koreanName,
    thumbnail,
    image,
  };
};
