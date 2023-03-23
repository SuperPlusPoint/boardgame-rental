interface KakaoProfile {
  nickname: string;
}

interface KakaoAccount {
  profile?: KakaoProfile;
}

export interface KakaoUser {
  id: number;
  kakao_account?: KakaoAccount;
}
