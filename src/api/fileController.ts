// @ts-ignore
/* eslint-disable */
import request from '@/lib/request';

/** downloadFileById GET /api/file/download */
export async function downloadFileByIdUsingGet1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.downloadFileByIdUsingGET1Params,
  options?: { [key: string]: any },
) {
  return request<any>('/api/file/download', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** uploadFile POST /api/file/upload */
export async function uploadFileUsingPost1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadFileUsingPOST1Params,
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseString_>('/api/file/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}