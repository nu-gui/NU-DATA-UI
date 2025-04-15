import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../src/components/common/Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button label="Click Me" onClick={() => {}} />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies custom className when provided', () => {
    render(<Button label="Click Me" onClick={() => {}} className="custom-class" />);
    expect(screen.getByText('Click Me')).toHaveClass('custom-class');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Click Me" onClick={() => {}} disabled={true} />);
    expect(screen.getByText('Click Me')).toBeDisabled();
  });
});
