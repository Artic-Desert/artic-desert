import React from 'react';
import { render, screen } from '@testing-library/react';
import Dummy from './Dummy';

test('renders learn react link', () => {
  render(<Dummy />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
