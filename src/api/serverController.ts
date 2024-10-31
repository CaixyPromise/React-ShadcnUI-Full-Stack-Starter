// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** getMonitorInfo GET /api/monitor/server/ */
export async function getMonitorInfoUsingGet1(options?: { [key: string]: any }) {
  return request<API.BaseResponseServerInfo_>('/api/monitor/server/', {
    method: 'GET',
    ...(options || {}),
  });
}
