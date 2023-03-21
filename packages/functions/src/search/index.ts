import express, {Request} from 'express';
import axios from 'axios';
import parser from 'xml-js';
import {BoardGameResponse, BoardgameSearchResponse} from './types';
import {toBoardGame} from './utils';

const router = express.Router();
const client = axios.create({baseURL: 'https://api.geekdo.com'});

const getBoardGameIds = async (keyword: string): Promise<string[] | null> => {
  const {data} = await client.get(`/xmlapi/search?search=${keyword}`);
  const {boardgames} = JSON.parse(parser.xml2json(data, {compact: true})) as BoardgameSearchResponse;
  if (!boardgames.boardgame) {
    return null;
  }
  const boardGameList = Array.isArray(boardgames.boardgame) ? boardgames.boardgame : [boardgames.boardgame];
  return boardGameList.map((game: BoardGameResponse) => game._attributes.objectid);
};

const getBoardGamesInfo = async (ids: string[]): Promise<BoardGameResponse[]> => {
  const {data} = await client.get(`/xmlapi/boardgame/${ids.join(',')}`);
  const nodes = JSON.parse(parser.xml2json(data, {compact: true}));
  return nodes.boardgames.boardgame;
};

interface ReqParams {}
interface ReqBody {}
interface ResBody {}
interface ReqQuery {
  keyword: string;
}
router.get('/', async (req: Request<ReqParams, ReqBody, ResBody, ReqQuery>, res) => {
  const {keyword} = req.query;
  const ids = await getBoardGameIds(keyword);
  if (!ids) {
    res.json([]);
    return;
  }
  const boardGameResponse = await getBoardGamesInfo(ids);
  const boardGameList = Array.isArray(boardGameResponse) ? boardGameResponse : [boardGameResponse];
  res.json(boardGameList.map(toBoardGame));
});

export default router;
