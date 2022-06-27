import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dummy } from './Dummy.component';

test('renders learn react link', () => {
  render(<Dummy />);
  const dummy = screen.getByText('Im a Dummy Component');
  expect(dummy).toBeInTheDocument();
});
