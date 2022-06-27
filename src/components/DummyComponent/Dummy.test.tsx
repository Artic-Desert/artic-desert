import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dummy } from './Dummy.component';

test('renders learn react link', () => {
  render(<Dummy />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
