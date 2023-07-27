import { TrainingDataInterface } from 'interfaces/training-data';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface NeuralNetworkInterface {
  id?: string;
  name: string;
  parameters: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  training_data?: TrainingDataInterface[];
  organization?: OrganizationInterface;
  _count?: {
    training_data?: number;
  };
}

export interface NeuralNetworkGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  parameters?: string;
  organization_id?: string;
}
