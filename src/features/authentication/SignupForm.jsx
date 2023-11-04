import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSignup } from './authHooks';
import SpinnerMini from '../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, handleSubmit, getValues, reset } =
    useForm();
  const { isSigningUp, signup } = useSignup();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Full name'
        error={errors['fullName'] && errors['fullName'].message}>
        <Input
          type='text'
          id='fullName'
          {...register('fullName', {
            required: 'This field is required',
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label='Email address'
        error={errors['email'] && errors['email'].message}>
        <Input
          type='email'
          id='email'
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Provide a valid email',
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label='Password (min 8 characters)'
        error={errors['password'] && errors['password'].message}>
        <Input
          type='password'
          id='password'
          {...register('password', {
            required: 'This field is required',
            validate: (val) =>
              val.length >= 8 ||
              'Password must be atleast 8 characters long.',
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label='Repeat password'
        error={
          errors['passwordConfirm'] &&
          errors['passwordConfirm'].message
        }>
        <Input
          type='password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (val) =>
              val === getValues().password ||
              'Passwords do not match.',
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <Button
          disabled={isSigningUp}
          variation='secondary'
          type='reset'>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>
          {' '}
          {!isSigningUp ? 'Create new user' : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
