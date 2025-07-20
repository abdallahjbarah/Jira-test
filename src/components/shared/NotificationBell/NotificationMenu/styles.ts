import styled from 'styled-components';

export const NotificationContainer = styled.div`
  width: 360px;
  background-color: white;
  padding: 0;
  border-top-left-radius: 24px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
  border: 1px solid #f4f4f4;
  transition: all 0.3s ease;
  max-height: min(80vh, 600px);
  display: flex;
  flex-direction: column;

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
    z-index: 1;
  }
`;

export const NotificationHeader = styled.div`
  font-weight: 400;
  font-size: 25px;
  line-height: 100%;
  letter-spacing: 0%;
  padding: 26px 11px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(to bottom, #f9fafb, #ffffff);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
`;

export const NotificationContent = styled.div`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const NotificationFooter = styled.div`
  flex-shrink: 0;
  border-top: 1px solid #f0f0f0;
  background: #f9fafb;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.05);
`;

export const DateSection = styled.div`
  background: linear-gradient(135deg, #cdefbd, #b8e6a1);
  padding: 12px 24px;
  margin: 16px 12px 8px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.2);
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
  margin: 8px 12px;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
    border-color: #e0e0e0;
  }

  &:last-child {
    margin-bottom: 12px;
  }
`;

export const NotificationTypeIndicator = styled.div<{ read?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 12px;

  &::before {
    content: '';
    display: ${props => (props.read ? 'none' : 'inline-block')};
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
  padding: 16px;
  background: white;
  border-radius: 8px;
  margin: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
`;

export const ActionButton = styled.button<{ isDelete?: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${props => (props.isDelete ? '#f44336' : '#333')};
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.isDelete ? '#ffebee' : '#f5f5f5')};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 180px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

export const DropdownItem = styled.button<{ isDelete?: boolean }>`
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  font-size: 14px;
  cursor: pointer;
  color: ${props => (props.isDelete ? '#f44336' : '#333')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => (props.isDelete ? '#ffebee' : '#f8f9fa')};
    transform: translateX(2px);
  }

  &:not(:last-child) {
    border-bottom: 1px solid #f5f5f5;
  }
`;
