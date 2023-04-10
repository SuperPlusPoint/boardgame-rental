import express, {Request} from 'express';
import axios from 'axios';
import parser from 'xml-js';
import {BoardGameResponse, BoardgameSearchResponse} from './types';
import {toBoardGame} from './utils';
import {db} from '..';

const router = express.Router();
const client = axios.create({baseURL: 'https://api.geekdo.com'});

const getBoardGameIds = async (keyword: string): Promise<string[] | null> => {
  const {data} = await client.get(`/xmlapi/search?search=${keyword}`).catch(() => ({data: ''}));
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

interface KeywordRequest extends Request {
  query: {
    keyword: string;
  }
}
router.get('/', async (req: KeywordRequest, res) => {
  const {keyword} = req.query;
  const ids = await getBoardGameIds(keyword);
  if (!ids) {
    res.json([]);
    return;
  }
  const boardGameResponse = await getBoardGamesInfo(ids);
  const boardGameList = Array.isArray(boardGameResponse) ? boardGameResponse : [boardGameResponse];

  const boardGames = boardGameList.map(toBoardGame);

  boardGames.map(boardGame => db.collection('boardgames').doc(boardGame.id).set(boardGame));
  res.json(boardGames);
});

// router.get('/update', async (req, res) => {
//   const batch = db.batch();
//   const userList = await db.collection('users').get();
//   const userIds: string[] = [];
//   userList.forEach((doc) => {
//     userIds.push(doc.id);
//   });
//   const boardGameRefs = await Promise.all(userIds.map(async (id) => {
//     const docs = await db.collection('users').doc(id).collection('boardgames').get();
//     const refs: any[] | PromiseLike<any[]> = [];
//     docs.forEach((doc) => {
//       refs.push(db.collection('users').doc(id).collection('boardgames').doc(doc.id));
//     });
//     return refs;
//   }));
//   await Promise.all(
//     boardGameRefs.flat().map(ref => batch.update(ref, {
//       created: admin.firestore.FieldValue.serverTimestamp()
//     }))
//   );
//   await batch.commit();
//   res.send('success');
// });

export default router;
