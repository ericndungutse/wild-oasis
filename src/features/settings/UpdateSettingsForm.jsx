import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSetting();

  const {
    minBookingLength,
    breakfastPrice,
    maxBookingLength,
    maxGuestsPerBooking,
  } = settings;

  function handleOnBlur(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({
      [field]: value,
    });
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isLoading || isUpdating}
          onBlur={(e) => handleOnBlur(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isLoading || isUpdating}
          onBlur={(e) => handleOnBlur(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isLoading || isUpdating}
          onBlur={(e) => handleOnBlur(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isLoading || isUpdating}
          onBlur={(e) => handleOnBlur(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
