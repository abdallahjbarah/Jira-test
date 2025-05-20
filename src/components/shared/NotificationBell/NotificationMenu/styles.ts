import styled from 'styled-components';

export const NotificationContainer = styled.div`
  width: 360px;
  background-color: white;
  padding-block: 26px;
  border-top-left-radius: 24px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  border: 1px solid #f4f4f4;
  transition: all 0.3s ease;

  &::before {
    content: '';
    width: 56px;
    height: 67px;
    transform: rotate(90deg);
    border-bottom-right-radius: 50px;
    background-color: #fe360a;
    position: absolute;
    top: -5px;
    right: 0;
  }
`;

export const NotificationHeader = styled.div`
  font-weight: 400;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: 0%;
`;

export const DateSection = styled.div`
  background-color: #cdefbd;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const DateLabel = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
`;

export const DateValue = styled.span`
  color: #666;
  font-size: 14px;
  line-height: 100%;
`;

export const NotificationItem = styled.div`
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &:last-child {
    border-bottom: none;
  }
`;

export const NotificationTypeIndicator = styled.div<{ read?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 12px;

  &::before {
    content: '';
    display: ${(props) => (props.read ? 'none' : 'inline-block')};
    width: 8px;
    height: 8px;
    background-color: #4caf50;
    border-radius: 50%;
    margin-right: 6px;
    align-self: center;
  }
`;

export const NotificationTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

export const TimeAgo = styled.span`
  font-size: 12px;
`;

export const NotificationMessage = styled.div`
  font-size: 14px;
  line-height: 100%;
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
`;

export const ActionButton = styled.button<{ isDelete?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${(props) => (props.isDelete ? '#f44336' : '#333')};
  padding: 4px 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #888;
  font-size: 18px;
  padding: 0;
`;

export const DropdownContent = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 160px;
  overflow: hidden;
`;

export const DropdownItem = styled.button<{ isDelete?: boolean }>`
  display: block;
  width: 100%;
  padding: 12px;
  text-align: left;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${(props) => (props.isDelete ? '#f44336' : '#333')};

  &:hover {
    background-color: #f5f5f5;
  }
`;
