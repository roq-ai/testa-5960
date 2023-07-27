import * as yup from 'yup';

export const neuralNetworkValidationSchema = yup.object().shape({
  name: yup.string().required(),
  parameters: yup.string().required(),
  organization_id: yup.string().nullable(),
});
