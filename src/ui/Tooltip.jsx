import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledTooltip = styled.div`
  font-size: 14px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #cccccc;

  color: ${(props) => props.colors.color};
  background-color: ${(props) => props.colors.background};
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Item = styled.div`
  margin-bottom: 4px;
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

const Value = styled.span`
  font-weight: normal;
`;

const CustomTooltip = ({ active, payload, label }) => {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        text: "#374151",
        background: "#fff",
      };

  if (active) {
    return (
      <StyledTooltip colors={colors}>
        <Title>{label}</Title>
        {payload.map((entry, index) => (
          <Item key={`item-${index}`}>
            <Label>{entry.name}:</Label>
            <Value>{entry.value}</Value>
          </Item>
        ))}
      </StyledTooltip>
    );
  }

  return null;
};

export default CustomTooltip;
