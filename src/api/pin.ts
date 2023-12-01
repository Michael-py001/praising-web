import request, { Response } from '@/libs/request';

export interface KeywordResult {
  id: number;
  word: string;
  weight: number;
  hot: number;
  count: number;
  comment: number;
  like: number;
  pinIds: string[];
  authorIds: string[];
  isBlock: boolean;
}

export function getKeywords(size: number = 10) {
  return request<Response<KeywordResult[]>>({
    method: 'get',
    url: '/pin/list',
    params: {
      size,
    },
  });
}
