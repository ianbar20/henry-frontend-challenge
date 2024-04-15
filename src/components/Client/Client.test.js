import { render, fireEvent } from '@testing-library/react';
import Client from './Client';

describe('Client', () => {
  test('renders Client component', () => {
    render(<Client id="123" providers={[]} reserveSlot={() => {}} confirmSlot={() => {}} />);
  });

  test('renders client ID', () => {
    const { getByText } = render(<Client id="123" providers={[]} reserveSlot={() => {}} confirmSlot={() => {}} />);
    const clientId = getByText("Client ID: 123");
    expect(clientId).toBeInTheDocument();
  });

  test('calls reserveSlot and confirmSlot when buttons are clicked', () => {
    const reserveSlot = jest.fn();
    const confirmSlot = jest.fn();
    const providers = [
      { 
        id: '1', 
        name: 'Provider 1', 
        schedule: [
          { date: '2024-09-04', startTime: '09:00', endTime: '10:00' },
          { date: '2022-09-06', startTime: '10:00', endTime: '11:00' }
        ] 
      },
      { 
        id: '2', 
        name: 'Provider 2', 
        schedule: [
          { date: '2022-08-03', startTime: '11:00', endTime: '12:00' },
          { date: '2022-08-04', startTime: '12:00', endTime: '13:00' }
        ] 
      }
    ];
    
    const { getByText, getByTestId } = render(<Client id="123" providers={providers} reserveSlot={reserveSlot} confirmSlot={confirmSlot} />);
    const dropdown = getByTestId("time-dropdown");

    fireEvent.change(dropdown, { target: { value: '2024-09-04 09:00 - 10:00' } });

    const reserveButton = getByText("Reserve");
    fireEvent.click(reserveButton);

    const confirmButton = getByText("Confirm");
  
    fireEvent.click(confirmButton);
  
    expect(reserveSlot).toHaveBeenCalled();
    expect(confirmSlot).toHaveBeenCalled();
  });
});