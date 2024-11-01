// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** doThumb POST /api/post_thumb/ */
export async function doThumbUsingPost1(
  body: API.PostThumbAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInt_>('/api/post_thumb/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
