import Svg, { Circle, Path } from 'react-native-svg';

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
