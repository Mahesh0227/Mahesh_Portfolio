import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio hero', () => {
  render(<App />);
  expect(screen.getByText(/Adhapureddy/i, { selector: 'h1' })).toBeInTheDocument();
});
