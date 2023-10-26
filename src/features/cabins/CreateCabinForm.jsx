import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useUpdateCabin, useCreateCabin } from './cabinHooks';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });
  const { errors } = formState;

  const { editCabin, isEditing } = useUpdateCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image =
      typeof data.image === 'string' ? data.image : data.image[0];

    if (isEditSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId });
    } else {
      createCabin({ ...data, image }, { onSuccess: () => reset() });
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
