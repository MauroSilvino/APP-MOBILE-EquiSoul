import { StyleSheet, View } from 'react-native';
import Svg, { Polyline, Rect } from 'react-native-svg';
import { theme } from '../../theme';
import { Text } from './Text';

export interface LineChartPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartPoint[];
  min: number;
  max: number;
  height?: number;
  color?: string;
  bandRange?: [number, number];
  bandColor?: string;
  bandLabel?: string;
}

const VIEW_WIDTH = 200;

export function LineChart({
  data,
  min,
  max,
  height = 80,
  color = theme.colors.accent.gold,
  bandRange,
  bandColor = 'rgba(107,115,83,0.14)',
  bandLabel,
}: LineChartProps) {
  const span = max - min || 1;
  const toY = (value: number) => height - ((value - min) / span) * height;

  const points = data
    .map((point, index) => {
      const x = data.length > 1 ? (index / (data.length - 1)) * VIEW_WIDTH : VIEW_WIDTH / 2;
      const y = Math.max(0, Math.min(height, toY(point.value)));
      return `${x},${y}`;
    })
    .join(' ');

  const band = bandRange
    ? {
        y: Math.min(toY(bandRange[0]), toY(bandRange[1])),
        h: Math.abs(toY(bandRange[0]) - toY(bandRange[1])),
      }
    : null;

  return (
    <View>
      <View style={styles.row}>
        <View style={styles.axisLabels}>
          <Text variant="xs" weight="semiBold" color="tertiary">
            {max}
          </Text>
          <Text variant="xs" weight="semiBold" color="tertiary">
            {min}
          </Text>
        </View>
        <Svg viewBox={`0 0 ${VIEW_WIDTH} ${height}`} width="100%" height={height} preserveAspectRatio="none" style={styles.svg}>
          {band && <Rect x={0} y={band.y} width={VIEW_WIDTH} height={band.h} fill={bandColor} />}
          <Polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>
      <View style={styles.monthsRow}>
        {data.map((point) => (
          <Text key={point.label} variant="xs" weight="semiBold" color="tertiary">
            {point.label}
          </Text>
        ))}
      </View>
      {bandLabel && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: bandColor.replace('0.14', '0.5') }]} />
          <Text variant="xs" weight="semiBold" color="secondary">
            {bandLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  axisLabels: {
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  svg: {
    flex: 1,
  },
  monthsRow: {
    marginTop: theme.spacing.sm,
    marginLeft: 38,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendRow: {
    marginTop: theme.spacing.xs,
    marginLeft: 38,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
});
