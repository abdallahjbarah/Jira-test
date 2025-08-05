'use client';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface CircularLoaderProps {
  size?: number;
  color?: string;
  thickness?: number;
  className?: string;
}

interface StyledSpinnerProps {
  size?: number;
  color?: string;
  $thickness?: number;
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderContainer = styled.div<CircularLoaderProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  position: relative;
  display: inline-block;
`;

const Spinner = styled.div<StyledSpinnerProps>`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: ${(props) => props.$thickness}px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${(props) => props.color};
  animation: ${spin} 0.8s linear infinite;
`;

const CircularLoader: React.FC<CircularLoaderProps> = ({
  size = 40,
  color = '#FE360A',
  thickness = 4,
  className,
}) => {
  return (
    <LoaderContainer size={size} className={className}>
      <Spinner size={size} color={color} $thickness={thickness} />
    </LoaderContainer>
  );
};

export default CircularLoader;
