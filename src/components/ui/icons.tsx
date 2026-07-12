import Svg, { Circle, Path, Rect } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function BackIcon({ size = 18, color = '#2B2924', strokeWidth = 2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CompassIcon({ size = 24, color = '#FBF9F4', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="6" />
      <Path d="M2 12h4M18 12h4" strokeLinecap="round" />
    </Svg>
  );
}

export function CheckIcon({ size = 13, color = '#FBF9F4', strokeWidth = 3 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 12l6 6L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CameraIcon({ size = 18, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 7h4l2-3h4l2 3h4v13H4z" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="13" r="3.5" />
    </Svg>
  );
}

export function LetterIcon({ size = 34, color = '#C9A15A', strokeWidth = 1.5 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M3 6h18v12H3z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 6l9 7 9-7" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function HomeIcon({ size = 22, color = '#C9A15A', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 11L12 4l8 7" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9h12v-9" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function DiaryIcon({ size = 22, color = 'rgba(247,243,236,0.5)', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M5 4h11l3 3v13H5z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 4v6l3-2 3 2V4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlusIcon({ size = 20, color = '#2B2924', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </Svg>
  );
}

export function CommunityIcon({ size = 22, color = 'rgba(247,243,236,0.5)', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M20.8 8.6c0 5-8.8 10-8.8 10s-8.8-5-8.8-10a4.6 4.6 0 018.8-2 4.6 4.6 0 018.8 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ProfileIcon({ size = 22, color = 'rgba(247,243,236,0.5)', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="8" r="3.4" />
      <Path d="M5 20c1-4 4-6 7-6s6 2 7 6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SearchIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="11" cy="11" r="7" />
      <Path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </Svg>
  );
}

export function BellIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M18 8a6 6 0 00-12 0c0 5-2 6-2 6h16s-2-1-2-6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 20a2 2 0 004 0" strokeLinecap="round" />
    </Svg>
  );
}

export function CalendarIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="4" y="5" width="16" height="15" rx="2" />
      <Path d="M4 10h16M8 3v4M16 3v4" strokeLinecap="round" />
    </Svg>
  );
}

export function HeartIcon({
  size = 22,
  color = '#C9A15A',
  strokeWidth = 2,
  filled = false,
}: IconProps & { filled?: boolean }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? color : 'none'} stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M20.8 8.6c0 5-8.8 10-8.8 10s-8.8-5-8.8-10a4.6 4.6 0 018.8-2 4.6 4.6 0 018.8 2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function CommentIcon({ size = 22, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M21 11.5a8.4 8.4 0 01-8.5 8.4A8.3 8.3 0 015 17l-2 1 1-3.6A8.4 8.4 0 1121 11.5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function ShareIcon({ size = 22, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 4l16 8-16 8V4z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function CloseIcon({ size = 12, color = '#FBF9F4', strokeWidth = 2.5 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </Svg>
  );
}

export function ImageIcon({ size = 20, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="3" y="5" width="18" height="14" rx="2" />
      <Circle cx="9" cy="11" r="2" />
      <Path d="M21 16l-5.5-5-4 4-2-2L3 18" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TypeBadgeIcon({ size = 22, color = '#6B7353', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ClockIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function LocationIcon({ size = 16, color = '#6B7353', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="10" r="3" />
      <Path d="M12 21s7-6.5 7-11a7 7 0 10-14 0c0 4.5 7 11 7 11z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
