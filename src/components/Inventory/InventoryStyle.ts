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
  height: 25px;
`;

export const InventoryContent = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  width: 288px;
  height: 655px;
`;

export const Box = styled.div`  
  width: 48px;
  height: 48px;
  background-color: rgba(239, 239, 239, 1);
`;