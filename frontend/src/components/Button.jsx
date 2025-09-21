import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease-in-out, opacity 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  ${props => props.variant === 'primary' && css`
    background-color: #007bff;
    color: white;

    &:hover:enabled {
      background-color: #0056b3;
    }
  `}

  ${props => props.variant === 'secondary' && css`
    background-color: #6c757d;
    color: white;

    &:hover:enabled {
      background-color: #5a6268;
    }
  `}

  ${props => props.variant === 'danger' && css`
    background-color: #dc3545;
    color: white;

    &:hover:enabled {
      background-color: #c82333;
    }
  `}

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

/**
 * A reusable button component.
 * @param {object} props - The component's props.
 * @param {React.ReactNode} props.children - The content inside the button (e.g., text).
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The button's style variant.
 * @param {'submit' | 'button' | 'reset'} [props.type='button'] - The button's HTML type.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      type={type}
      disabled={disabled}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;