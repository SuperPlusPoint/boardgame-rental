import express from 'express';
import axios from 'axios';
import parser from 'xml-js';
import * as logger from 'firebase-functions/logger';

const router = express.Router();

interface Game {
  _attributes: {
    objectid: string;
  }
}

router.get('/', async (req, res) => {
  const client = axios.create({baseURL: 'https://api.geekdo.com'});
  const {data} = await client.get('/xmlapi/search?search=브라스');
  const node = JSON.parse(parser.xml2json(data, {compact: true, spaces: 2}));
  logger.log(node);
  const ids = node.boardgames.boardgame.map((game: Game) => game._attributes.objectid);
  logger.log(ids);
  const {data: boardgames} = await client.get(`/xmlapi/boardgame/${ids.join(',')}`);
  logger.log(boardgames);
  const nodes = parser.xml2json(boardgames, {compact: true, spaces: 2});
  res.json(nodes);
});

export default router;
