import { NeuralNetworkInterface } from 'interfaces/neural-network';
import { GetQueryInterface } from 'interfaces';

export interface TrainingDataInterface {
  id?: string;
  data: string;
  neural_network_id?: string;
  created_at?: any;
  updated_at?: any;

  neural_network?: NeuralNetworkInterface;
  _count?: {};
}

export interface TrainingDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  data?: string;
  neural_network_id?: string;
}
