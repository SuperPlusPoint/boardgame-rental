import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SVGComponent, { Icon } from './SVGComponent';

interface CheckBoxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked, onChange }) => {
  const [value, setValue] = useState<boolean>(checked);
  useEffect(() => {
    setValue(checked);
  }, [checked]);
  return (
    <Box onClick={() => onChange(!value)}>
      <SVGComponent
        icon={checked ? Icon.CheckedBox : Icon.CheckBox}
        width={22}
        height={22}
      />
    </Box>
  );
};

export default CheckBox;
