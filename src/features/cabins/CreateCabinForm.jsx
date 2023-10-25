import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { createEditCabin } from '../../services/apiCabins';
import FormRow from '../../ui/FormRow';

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const queryClient = useQueryClient();
  const { errors } = formState;

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success('Cabin uccessfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) =>
      createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success('Cabin uccessfully updated');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Cabin name'
        error={errors?.name && errors?.name?.message}>
        <Input
          type='text'
          id='name'
          {...register('name', {
            required: 'This field is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Maximum capacity'
        error={
          errors['maxCapacity'] && errors['maxCapacity'].message
        }>
        <Input
          type='number'
          id='maxCapacity'
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should atleast be 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Regular price'
        error={
          errors['regularProce'] && errors['regularProce'].message
        }>
        <Input
          type='number'
          id='regularPrice'
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should atleast be 1',
            },
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Discount'
        error={errors?.discount && errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (val) =>
              +val <= +getValues().regularPrice ||
              'Discount should be less thatn regular price',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={
          errors['description'] && errors['description'].message
        }>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description', {
            required: 'This field is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow
        label='Cabin photo'
        error={errors['image'] && errors['image'].message}>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isWorking}
          {...register('image', {
            required: isEditSession
              ? false
              : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
