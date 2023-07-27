import axios from 'axios';
import queryString from 'query-string';
import { TrainingDataInterface, TrainingDataGetQueryInterface } from 'interfaces/training-data';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTrainingData = async (
  query?: TrainingDataGetQueryInterface,
): Promise<PaginatedInterface<TrainingDataInterface>> => {
  const response = await axios.get('/api/training-data', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTrainingData = async (trainingData: TrainingDataInterface) => {
  const response = await axios.post('/api/training-data', trainingData);
  return response.data;
};

export const updateTrainingDataById = async (id: string, trainingData: TrainingDataInterface) => {
  const response = await axios.put(`/api/training-data/${id}`, trainingData);
  return response.data;
};

export const getTrainingDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/training-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrainingDataById = async (id: string) => {
  const response = await axios.delete(`/api/training-data/${id}`);
  return response.data;
};
