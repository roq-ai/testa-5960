import axios from 'axios';
import queryString from 'query-string';
import { NeuralNetworkInterface, NeuralNetworkGetQueryInterface } from 'interfaces/neural-network';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getNeuralNetworks = async (
  query?: NeuralNetworkGetQueryInterface,
): Promise<PaginatedInterface<NeuralNetworkInterface>> => {
  const response = await axios.get('/api/neural-networks', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createNeuralNetwork = async (neuralNetwork: NeuralNetworkInterface) => {
  const response = await axios.post('/api/neural-networks', neuralNetwork);
  return response.data;
};

export const updateNeuralNetworkById = async (id: string, neuralNetwork: NeuralNetworkInterface) => {
  const response = await axios.put(`/api/neural-networks/${id}`, neuralNetwork);
  return response.data;
};

export const getNeuralNetworkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/neural-networks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteNeuralNetworkById = async (id: string) => {
  const response = await axios.delete(`/api/neural-networks/${id}`);
  return response.data;
};
