import React from 'react';
import CategoryIcon, { CategoryProps } from './CategoryIcon';
import AddIcon, { AddProps } from './AddIcon';
import ProfileIcon, { ProfileProps } from './ProfileIcon';
import SettingIcon, { SettingProps } from './SettingIcon';
import LinkIcon, { LinkProps } from './LinkIcon';
import TitleIcon, { TitleProps } from './TitleIcon';
import MenuIcon, { MenuProps } from './MenuIcon';
import SearchIcon, { SearchProps } from './SearchIcon';
import MinusIcon, { MinusProps } from './MinusIcon';
import PlusIcon, { PlusProps } from './PlusIcon';
import SelectArrowIcon, { SelectArrowProps } from './SelectArrowIcon';
import UserIcon, { UserProps } from './UserIcon';
import ClockIcon, { ClockProps } from './ClockIcon';
import LeftArrowIcon from './LeftArrow';
import CheckBoxIcon from './CheckBoxIcon';
import CheckedBoxIcon from './CheckedBoxIcon';
import CloseSquareIcon from './CloseSquareIcon';

export enum Icon {
  Category = 'Category',
  Add = 'Add',
  Minus = 'Minus',
  Plus = 'Plus',
  Profile = 'Profile',
  Setting = 'Setting',
  Link = 'Link',
  Title = 'Title',
  Menu = 'Menu',
  Search = 'Search',
  User = 'User',
  Clock = 'Clock',
  SelectArrow = 'SelectArrow',
  LeftArrow = 'LeftArrow',
  CheckBox = 'CheckBox',
  CheckedBox = 'CheckedBox',
  Close = 'Close',
}

interface SVGProps {
  icon: Icon;
  width?: number;
  height?: number;
  stroke?: number;
  color?: string;
  bgColor?: string;
  style?: React.CSSProperties;
}

const icons = {
  [Icon.Category]: ({ stroke, color }: CategoryProps) => (
    <CategoryIcon stroke={stroke} color={color} />
  ),
  [Icon.Add]: ({ stroke, color }: AddProps) => (
    <AddIcon stroke={stroke} color={color} />
  ),
  [Icon.Profile]: ({ stroke, color }: ProfileProps) => (
    <ProfileIcon stroke={stroke} color={color} />
  ),
  [Icon.Setting]: ({ stroke, color }: SettingProps) => (
    <SettingIcon stroke={stroke} color={color} />
  ),
  [Icon.Link]: ({ width, height, color }: LinkProps) => (
    <LinkIcon width={width} height={height} color={color} />
  ),
  [Icon.Minus]: ({ color, bgColor }: MinusProps) => (
    <MinusIcon color={color} bgColor={bgColor} />
  ),
  [Icon.Plus]: ({ color, bgColor }: PlusProps) => (
    <PlusIcon color={color} bgColor={bgColor} />
  ),
  [Icon.SelectArrow]: ({ color }: SelectArrowProps) => (
    <SelectArrowIcon color={color} />
  ),
  [Icon.Menu]: ({ color }: MenuProps) => <MenuIcon color={color} />,
  [Icon.Search]: ({ color }: SearchProps) => <SearchIcon color={color} />,
  [Icon.User]: ({ color }: UserProps) => <UserIcon color={color} />,
  [Icon.Clock]: ({ color }: ClockProps) => <ClockIcon color={color} />,
  [Icon.Title]: ({ width }: TitleProps) => <TitleIcon width={width} />,
  [Icon.LeftArrow]: () => <LeftArrowIcon />,
  [Icon.CheckBox]: () => <CheckBoxIcon />,
  [Icon.Close]: () => <CloseSquareIcon />,
  [Icon.CheckedBox]: () => <CheckedBoxIcon />,
};

const SVGComponent = ({
  icon,
  width = 28,
  height = 28,
  stroke = 1.5,
  color = 'white',
  bgColor = '#F0F0F0',
  style,
}: SVGProps) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    {icons[icon]({ stroke, color, bgColor, width, height })}
  </svg>
);

export default SVGComponent;
