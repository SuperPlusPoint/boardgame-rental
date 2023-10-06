import React from 'react';
import { Text, Flex, Button } from '@chakra-ui/react';
import { UserBoardGame } from '../models/boardgame';
import NumericInput from './NumericInput';
import SVGComponent, { Icon } from './common/SVGComponent';

interface SelectedItemProps {
  item: UserBoardGame;
  changeTotal: (boarGame: UserBoardGame, total: number) => void;
}
const SelectedItem: React.FC<SelectedItemProps> = ({ item, changeTotal }) => {
  return (
    <Flex
      py="16px"
      px="18px"
      borderBottom="1px solid black"
      alignItems="center"
    >
      <Text
        flex="1"
        fontWeight="semibold"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
      >
        {item.name}
      </Text>
      <NumericInput
        value={item.total}
        onChange={(value) => changeTotal(item, value)}
      />
      <Button variant="unstyled" onClick={() => changeTotal(item, -1)}>
        <SVGComponent
          style={{ marginLeft: '58px' }}
          icon={Icon.Close}
          width={22}
          height={22}
        />
      </Button>
    </Flex>
  );
};

export default SelectedItem;
