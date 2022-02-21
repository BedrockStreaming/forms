import { COMPLETE_STATUS, INCOMPLETE_STATUS, DEFAULT_STATUS } from '@bedrockstreaming/form-validation-rule-list';
import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  text-align: left;
  list-style: none;
`;

export const ListItem = styled.li`
  margin: 4px;
  font-size: smaller;

  &.${COMPLETE_STATUS} {
    color: #4ed569;
  }
  &.${INCOMPLETE_STATUS} {
    color: #da3b2b;
  }
  &.${DEFAULT_STATUS} {
    color: #2e2e2d;
  }
`;

export const RuleList = ({ items }: { items: { key: string; status: string }[] }) => {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.key} className={item.status}>
          <span>{item.key}</span>
        </ListItem>
      ))}
    </List>
  );
};
