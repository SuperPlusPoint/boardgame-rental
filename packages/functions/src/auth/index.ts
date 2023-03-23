import express from 'express';
import axios from 'axios';
import {KakaoUser} from './types';
import {db} from '..';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('auth');
});

const createUser = (uid: string, name: string) => ({
  uid,
  name,
  boardGames: [],
});

router.post('/kakao', async (req, res) => {
  const {accessToken} = req.body;
  console.log(accessToken);
  const {data: user} = await axios.get<KakaoUser>('https://kapi.kakao.com/v2/user/me', {
    headers: {Authorization: `Bearer ${accessToken}`},
  });
  console.log(user);
  const userRef = db.collection('users').doc(`${user.id}`);

  const userData = await userRef.get();
  if (userData.exists) {
    res.json(userData.data());
  } else {
    const newUser = createUser(`${user.id}`, user.kakao_account?.profile?.nickname || '');
    await userRef.set(newUser);
    res.json(newUser);
  }
});

export default router;
