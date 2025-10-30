import styled from 'styled-components';

export const MenuWrapper = styled.div`
  width: 728px;
  top: 122px;
  padding: 16px 0;
  border-radius: 16px;
  box-shadow: 0px 0px 16px 0px rgba(58, 58, 58, 0.1);
`;

export const MenuContent = styled.div`
  padding: 0;
  background-color: #f8f9fa;
  border-radius: 0 0 7px 7px;
  overflow: hidden;
`;

export const SubMenuWrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 0px 16px 0px rgba(58, 58, 58, 0.1);
  cursor: pointer;
`;

export const SubMenuHeader = styled.div`
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