import { render, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  test('renders Login component', () => {
    render(<Login setUser={() => {}} addNewProvider={() => {}} addNewClient={() => {}} userType="client" />);
  });

  test('calls setUser, addNewProvider, and addNewClient when form is submitted', () => {
    const setUser = jest.fn();
    const addNewProvider = jest.fn();
    const addNewClient = jest.fn();
    const { getByText, getByLabelText } = render(<Login setUser={setUser} addNewProvider={addNewProvider} addNewClient={addNewClient} userType="client" />);
    const idInput = getByLabelText("Enter your ID");
    const submitButton = getByText("Log in");

    fireEvent.change(idInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(setUser).toHaveBeenCalledWith('123');
    expect(addNewClient).toHaveBeenCalledWith('123');
    expect(addNewProvider).not.toHaveBeenCalled();
  });
});