import styled from 'styled-components';
import _ from 'lodash';

const get = (propertyName) => (props) => _.get(props, propertyName);

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const DotTextLi = styled.li`
  display: inline-block;
  font-weight: ${get('itemFontWeight')};
  color: ${get('itemColor')};
  &:not(:last-child) {
    margin: 0 16px 4px 0;
  }
`;

export const DotText = ({ key, itemColor, itemFontWeight }) => {
  // Used in UT and FT
  const status = itemFontWeight === 'bold' ? 'nok' : 'ok';

  return (
    <DotTextLi
      key={key}
      itemColor={itemColor}
      itemFontWeight={itemFontWeight}
      data-testid={`hint-${_.kebabCase(key)}-${status}`}
    >
      <span>{key}</span>
    </DotTextLi>
  );
};

export const DotTextList = ({ items, ...otherProps }) => (
  <List {...otherProps}>{_.map(items, DotText)}</List>
);
