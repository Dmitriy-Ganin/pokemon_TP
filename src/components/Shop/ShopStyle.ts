import styled from 'styled-components';

export const ShopWrapper = styled.div`
  width: 320px;
    height: 725px;
    top: 122px;
    left: 16px;
    padding: 16px;
    border-radius: 16px;
    box-shadow: 0px 0px 16px 0px rgba(58, 58, 58, 0.1);
`;

export const ShopHeader = styled.div`
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

export const ShopContent = styled.div`
  padding: 12px;
  border-radius: 16px;
`;