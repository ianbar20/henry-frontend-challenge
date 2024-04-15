import { render, fireEvent } from '@testing-library/react';
import Provider from './Provider';

describe('Provider', () => {
  test('renders Provider component', () => {
    render(<Provider id="123" schedule={[]} addProviderAvailability={() => {}} />);
  });

  test('renders provider ID', () => {
    const { getByText } = render(<Provider id="123" schedule={[]} addProviderAvailability={() => {}} />);
    const providerId = getByText("Provider ID: 123");
    expect(providerId).toBeInTheDocument();
  });

  test('renders schedule', () => {
    const schedule = [
      { date: '2025-01-01', startTime: '09:00', endTime: '10:00' },
      { date: '2025-01-02', startTime: '10:00', endTime: '11:00' }
    ];
    const { getByText } = render(<Provider id="123" schedule={schedule} addProviderAvailability={() => {}} />);
    const firstSlot = getByText("9:00 AM - 10:00 AM");
    const secondSlot = getByText("10:00 AM - 11:00 AM");
    expect(firstSlot).toBeInTheDocument();
    expect(secondSlot).toBeInTheDocument();
  });
  
  test('calls addProviderAvailability when form is submitted', () => {
    const addProviderAvailability = jest.fn();
    const { getByText, getByTestId } = render(<Provider id="123" schedule={[]} addProviderAvailability={addProviderAvailability} />);
    const dateInput = getByTestId("date-input");
    const startTimeInput = getByTestId("start-time-input");
    const endTimeInput = getByTestId("end-time-input");
    const submitButton = getByText("Submit Time Slot");
  
    fireEvent.change(dateInput, { target: { value: '2022-01-01' } });
    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    fireEvent.change(endTimeInput, { target: { value: '10:00' } });
    fireEvent.click(submitButton);
  
    expect(addProviderAvailability).toHaveBeenCalledWith("123", "2022-01-01", "09:00", "10:00");
  });
});