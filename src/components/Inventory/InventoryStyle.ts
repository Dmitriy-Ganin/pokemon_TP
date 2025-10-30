import styled from 'styled-components';

export const InventoryWrapper = styled.div`
  width: 320px;
  height: 725px;
  top: 122px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 0px 16px 0px rgba(58, 58, 58, 0.1);
`;

export const InventoryHeader = styled.div`
-webkit-text-stroke: 2px var(--Secondary, rgba(54, 95, 172, 1));
  paint-order: stroke fill;
  font-family: Inter;
  font-weight: 700;
  font-style: bold;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: 0%;
  color: var(--Primary, rgba(255, 204, 1, 1));
  height: 60px;
`;

export const InventoryContent = styled.div`
  padding: 10px;
`;