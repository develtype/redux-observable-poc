import { DataType } from 'src/type/data.type';
import { httpApi } from 'src/util/http.module';

const fetchDatas = () => httpApi.get<DataType[]>({ url: '/data' });

export type CreateDataParamsType = {
  data: string;
};
const createData = (params: CreateDataParamsType) =>
  httpApi.post<DataType>({ url: '/data', body: params });

export type DeleteDataParamsType = {
  id: string;
};
const deleteData = (params: DeleteDataParamsType) =>
  httpApi.delete({ url: `/data/${params.id}` });

export type UpdateDataParamsType = {
  id: string;
  data: string;
};
const updateData = (params: UpdateDataParamsType) =>
  httpApi.put({
    url: `/data/${params.id}`,
    body: {
      data: params.data,
    },
  });

export const dataService = {
  fetchDatas,
  createData,
  deleteData,
  updateData,
};
