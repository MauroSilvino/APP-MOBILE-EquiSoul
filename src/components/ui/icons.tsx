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

export function ReelsIcon({ size = 22, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="3" y="4" width="18" height="16" rx="3" />
      <Path d="M9 4l3 5 3-5M9 20l3-5 3 5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SaveIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8, filled = false }: IconProps & { filled?: boolean }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={filled ? color : 'none'} stroke={color} strokeWidth={strokeWidth}>
      <Path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function SendIcon({ size = 18, color = '#2B2924', strokeWidth = 2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 12h16M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TrendIcon({ size = 20, color = '#6B7353', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 19h16M7 15l4-5 3 3 4-7" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function GalleryIcon({ size = 20, color = '#6B7353', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="3" y="3" width="18" height="18" rx="3" />
      <Circle cx="8.5" cy="8.5" r="1.5" />
      <Path d="M21 15l-5-5-4 4-3-3-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TrophyIcon({ size = 20, color = '#C9A15A', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 01-10 0V4z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 6H3v2a4 4 0 004 4M19 6h2v2a4 4 0 01-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PulseHeartIcon({ size = 20, color = '#6B7353', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function LockIcon({ size = 26, color = '#6b6558', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="5" y="11" width="14" height="9" rx="2" />
      <Path d="M8 11V8a4 4 0 018 0v3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PlayIcon({ size = 11, color = '#FBF9F4' }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke="none">
      <Path d="M6 4l14 8-14 8z" />
    </Svg>
  );
}

export function VerifiedIcon({ size = 15, color = '#C9A15A' }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke="none">
      <Circle cx="12" cy="12" r="10" />
    </Svg>
  );
}

export function VaccineIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 9v6M9 12h6" strokeLinecap="round" />
    </Svg>
  );
}

export function ParasiteIcon({ size = 17, color = '#4F5D45', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M12 21c-4 0-7-2.5-7-6.5C5 10 12 3 12 3s7 7 7 11.5C19 18.5 16 21 12 21z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function PillIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M7 17L17 7a3.5 3.5 0 115 5L12 22a3.5 3.5 0 01-5-5z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.5 14.5l5-5" strokeLinecap="round" />
    </Svg>
  );
}

export function HorseshoeIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M6 20v-8a6 6 0 0112 0v8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ToothIcon({ size = 17, color = '#4F5D45', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M12 3c-3 0-5 2-5 5 0 3 1 4 1 7 0 2 1 3 2 3s1-2 2-4c1 2 1 4 2 4s2-1 2-3c0-3 1-4 1-7 0-3-2-5-5-5z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function BowlIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 12a8 8 0 0016 0H4z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 12V9M16 12V9" strokeLinecap="round" />
    </Svg>
  );
}

export function ScaleIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M12 3v4M7 7h10M5 21h14M7 21l3-10h4l3 10" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ExamIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M9 3h6a1 1 0 011 1v1h1a2 2 0 012 2v13a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h1V4a1 1 0 011-1z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function InjuryIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M12 8v8M8 12h8" strokeLinecap="round" />
    </Svg>
  );
}

export function VetIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M7 3v4a3 3 0 006 0V3" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 7v3a5 5 0 0010 0v-2" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="20" cy="8" r="2" />
    </Svg>
  );
}

export function DocumentIcon({ size = 17, color = '#8A6E4B', strokeWidth = 1.6 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M4 19V6a2 2 0 012-2h9l5 5v10a2 2 0 01-2 2H6a2 2 0 01-2-2z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function AiIcon({ size = 18, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
      <Path d="M12 8v4l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function RefreshIcon({ size = 13, color = '#8A6E4B', strokeWidth = 2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 4v6h6M20 20v-6h-6" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5.6 9A7.5 7.5 0 0119 8.5M18.4 15A7.5 7.5 0 015 15.5" strokeLinecap="round" />
    </Svg>
  );
}

export function ChartBarIcon({ size = 15, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 19V9M12 19V4M20 19v-7" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function PeopleIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="9" cy="9" r="3.2" />
      <Circle cx="17" cy="9" r="2.4" />
      <Path d="M4 20c.5-3.5 2.5-5.5 5-5.5s4.5 2 5 5.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TicketIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function StoreIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M4 9l1-5h14l1 5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 9a2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M5 9v11h14V9" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 20v-6h4v6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function WalletIcon({ size = 20, color = '#2B2924', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Rect x="3" y="6" width="18" height="13" rx="2" />
      <Path d="M3 10h18M16 14h2" strokeLinecap="round" />
    </Svg>
  );
}

export function StarIcon({ size = 14, color = '#C9A15A' }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill={color} stroke="none">
      <Path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
    </Svg>
  );
}

export function ChevronRightIcon({ size = 16, color = '#2B2924', strokeWidth = 2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function MinusIcon({ size = 14, color = '#2B2924', strokeWidth = 2.2 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M5 12h14" strokeLinecap="round" />
    </Svg>
  );
}

export function MountainIcon({ size = 20, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M3 18l6-9 4 5 3-4 5 8z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function RouteIcon({ size = 18, color = '#8A6E4B', strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="5" cy="19" r="2.4" />
      <Circle cx="19" cy="9" r="2.4" />
      <Path d="M7 16.5l9-6" strokeLinecap="round" />
    </Svg>
  );
}

export function ShieldIcon({ size = 18, color = '#8A6E4B', strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function TargetIcon({ size = 18, color = '#8A6E4B', strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="8" />
      <Circle cx="12" cy="12" r="4" />
      <Circle cx="12" cy="12" r="1" fill={color} />
    </Svg>
  );
}

export function FlameIcon({ size = 20, color = '#C9A15A', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Path
        d="M12 3c2 3-1 4-1 7a4 4 0 108 0c0-1-.3-2-1-3 1 4-1 6-3 6a4 4 0 01-4-4c0-3 1-4 1-6z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function SealIcon({ size = 22, color = '#8A6E4B', strokeWidth = 1.8 }: IconProps) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth}>
      <Circle cx="12" cy="12" r="8" />
      <Path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
