import React from 'react';
import CategoryIcon, { CategoryProps } from './CategoryIcon';
import PlusIcon, { PlusProps } from './PlusIcon';
import ProfileIcon, { ProfileProps } from './ProfileIcon';
import SettingIcon, { SettingProps } from './SettingIcon';
import LinkIcon, { LinkProps } from './LinkIcon';
import TitleIcon, { TitleProps } from './TitleIcon';
import MenuIcon, { MenuProps } from './MenuIcon';
import SearchIcon, { SearchProps } from './SearchIcon';

export enum Icon {
  Category = 'Category',
  Plus = 'Plus',
  Profile = 'Profile',
  Setting = 'Setting',
  Link = 'Link',
  Title = 'Title',
  Menu = 'Menu',
  Search = 'Search',
}

interface SVGProps {
  icon: Icon;
  width?: number;
  height?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
}

const icons = {
  [Icon.Category]: ({ stroke, color }: CategoryProps) => (
    <CategoryIcon stroke={stroke} color={color} />
  ),
  [Icon.Plus]: ({ stroke, color }: PlusProps) => (
    <PlusIcon stroke={stroke} color={color} />
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
  [Icon.Menu]: ({ color }: MenuProps) => <MenuIcon color={color} />,
  [Icon.Search]: ({ color }: SearchProps) => <SearchIcon color={color} />,
  [Icon.Title]: ({ width }: TitleProps) => <TitleIcon width={width} />,
};

const SVGComponent = ({
  icon,
  width = 28,
  height = 28,
  stroke = 1.5,
  color = 'white',
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
    {icons[icon]({ stroke, color, width, height })}
  </svg>
);

export default SVGComponent;
