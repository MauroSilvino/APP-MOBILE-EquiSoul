import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { Text } from '../ui/Text';
import { theme } from '../../theme';

export interface TourStep {
  caption: string;
  title: string;
  text: string;
}

interface TourOverlayProps {
  steps: TourStep[];
  index: number;
  onNext: () => void;
  onFinish: () => void;
  onDotPress: (index: number) => void;
  onSkip: () => void;
}

export function TourOverlay({ steps, index, onNext, onFinish, onDotPress, onSkip }: TourOverlayProps) {
  const current = steps[index];
  const isLast = index === steps.length - 1;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text variant="sm" weight="bold" color="secondary" style={styles.skip} onPress={onSkip}>
        Pular
      </Text>

      <ImagePlaceholder style={styles.photo} caption={current.caption} />

      <Text variant="xl" weight="extraBold" style={styles.title}>
        {current.title}
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.text}>
        {current.text}
      </Text>

      <View style={styles.dots}>
        {steps.map((step, i) => (
          <View
            key={step.title}
            onTouchEnd={() => onDotPress(i)}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>

      <Button variant="primary" onPress={isLast ? onFinish : onNext} style={styles.button}>
        {isLast ? 'Concluir' : 'Próximo'}
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  skip: {
    alignSelf: 'flex-end',
  },
  photo: {
    flex: 1,
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
  },
  title: {
    marginTop: theme.spacing.xl,
  },
  text: {
    marginTop: theme.spacing.sm,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.xs,
    marginTop: theme.spacing.lg,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.15)',
  },
  dotActive: {
    width: 22,
    backgroundColor: theme.colors.accent.gold,
  },
  button: {
    marginTop: theme.spacing.lg,
  },
});
