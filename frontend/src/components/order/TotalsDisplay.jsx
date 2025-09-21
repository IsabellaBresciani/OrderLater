import styled from 'styled-components';
import React from 'react';

const TotalsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  font-size: 1rem;
  color: #374151;
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  div:first-child {
    font-weight: 500;
  }
`;

const FinalTotalRow = styled(TotalRow)`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
`;

function TotalsDisplay({ totals }) {
  return (
    <TotalsContainer>
      <TotalRow>
        <div>Subtotal:</div>
        <div>${totals.subtotal.toFixed(2)}</div>
      </TotalRow>
      <TotalRow>
        <div>Descuento:</div>
        <div>-${totals.discount.toFixed(2)}</div>
      </TotalRow>
      <FinalTotalRow>
        <div>Total:</div>
        <div>${totals.total.toFixed(2)}</div>
      </FinalTotalRow>
    </TotalsContainer>
  );
}
export default TotalsDisplay;