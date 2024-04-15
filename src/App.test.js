import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });

  test('renders user type selection when no user type is selected', () => {
    const { getByText } = render(<App />);
    const providerButton = getByText("I'm a Provider");
    const clientButton = getByText("I'm a Client");

    expect(providerButton).toBeInTheDocument();
    expect(clientButton).toBeInTheDocument();
  });

  test('renders Login component when user type is selected', () => {
    const { getByText, queryByText } = render(<App />);
    const providerButton = getByText("I'm a Provider");

    fireEvent.click(providerButton);

    expect(queryByText("I'm a Provider")).not.toBeInTheDocument();
    expect(getByText("Enter your ID")).toBeInTheDocument();
  });

  test('renders Provider component when user type is provider and user is logged in', () => {
    const { getByText, getByLabelText } = render(<App />);
    const providerButton = getByText("I'm a Provider");
    fireEvent.click(providerButton);

    const loginButton = getByText("Log in");

    fireEvent.change(getByLabelText("Enter your ID"), { target: { value: '123' } });
    fireEvent.click(loginButton);

    expect(getByText("Provider ID: 123")).toBeInTheDocument();
  });

  test('renders Client component when user type is client and user is logged in', () => {
    const { getByText, getByLabelText } = render(<App />);
    const clientButton = getByText("I'm a Client");
    fireEvent.click(clientButton);

    const loginButton = getByText("Log in");

    fireEvent.change(getByLabelText("Enter your ID"), { target: { value: '123' } });
    fireEvent.click(loginButton);

    expect(getByText("Client ID: 123")).toBeInTheDocument();
  });

});