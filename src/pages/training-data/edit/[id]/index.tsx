import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { getTrainingDataById, updateTrainingDataById } from 'apiSdk/training-data';
import { trainingDataValidationSchema } from 'validationSchema/training-data';
import { TrainingDataInterface } from 'interfaces/training-data';
import { NeuralNetworkInterface } from 'interfaces/neural-network';
import { getNeuralNetworks } from 'apiSdk/neural-networks';

function TrainingDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TrainingDataInterface>(
    () => (id ? `/training-data/${id}` : null),
    () => getTrainingDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TrainingDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTrainingDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/training-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TrainingDataInterface>({
    initialValues: data,
    validationSchema: trainingDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Training Data',
              link: '/training-data',
            },
            {
              label: 'Update Training Data',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Training Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.data}
            label={'Data'}
            props={{
              name: 'data',
              placeholder: 'Data',
              value: formik.values?.data,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<NeuralNetworkInterface>
            formik={formik}
            name={'neural_network_id'}
            label={'Select Neural Network'}
            placeholder={'Select Neural Network'}
            fetcher={getNeuralNetworks}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/training-data')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'training_data',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TrainingDataEditPage);
