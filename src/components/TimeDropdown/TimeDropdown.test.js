import { render, fireEvent } from '@testing-library/react';
import TimeDropdown from './TimeDropdown';

describe('TimeDropdown', () => {
  test('renders TimeDropdown component', () => {
    render(<TimeDropdown startTime="09:00" endTime="10:00" confirmedSlots={[]}/>);
  });

  test('renders correct number of options', () => {
    const { getAllByRole } = render(<TimeDropdown startTime="09:00" endTime="10:00" confirmedSlots={[]} />);
    const options = getAllByRole('option');
    expect(options.length).toBe(5); // 4 time slots + 1 default option
  });

  test('does not render confirmed time slots', () => {
    const { queryByText } = render(<TimeDropdown startTime="09:00" endTime="10:00" confirmedSlots={[{ time: '09:15' }]} />);
    const option = queryByText('09:15 - 09:30');
    expect(option).toBeNull();
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<TimeDropdown startTime="09:00" endTime="10:00" confirmedSlots={[]} onChange={handleChange} />);
    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: '09:15' } });
    expect(handleChange).toHaveBeenCalled();
  });

});