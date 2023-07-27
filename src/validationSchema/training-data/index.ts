import * as yup from 'yup';

export const trainingDataValidationSchema = yup.object().shape({
  data: yup.string().required(),
  neural_network_id: yup.string().nullable(),
});
