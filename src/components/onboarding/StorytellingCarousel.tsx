import { useRef, useState } from 'react';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../ui/Button';
import { ImagePlaceholder } from '../ui/ImagePlaceholder';
import { Text } from '../ui/Text';
import { theme } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface StorytellingSlideData {
  caption: string;
  title: string;
  subtitle: string;
}

interface StorytellingCarouselProps {
  slides: StorytellingSlideData[];
  onSkip: () => void;
  onFinish: () => void;
}

export function StorytellingCarousel({ slides, onSkip, onFinish }: StorytellingCarouselProps) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const isLast = index === slides.length - 1;

  function handleMomentumScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const nextIndex = Math.round(event.nativeEvent.contentOffset.x / SCREEN_WIDTH);
    setIndex(nextIndex);
  }

  function handleNext() {
    if (isLast) {
      onFinish();
      return;
    }
    const nextIndex = index + 1;
    scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_WIDTH, animated: true });
    setIndex(nextIndex);
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text
        variant="sm"
        weight="bold"
        color="secondary"
        style={styles.skip}
        onPress={onSkip}
      >
        Pular
      </Text>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        style={styles.scroll}
      >
        {slides.map((slide) => (
          <View key={slide.title} style={styles.slide}>
            <ImagePlaceholder style={styles.photo} caption={slide.caption} />
          </View>
        ))}
      </ScrollView>

      <Text variant="xxl" weight="extraBold" style={styles.title}>
        {slides[index].title}
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        {slides[index].subtitle}
      </Text>

      <View style={styles.dots}>
        {slides.map((slide, i) => (
          <View key={slide.title} style={[styles.dot, i === index && styles.dotActive]} />
        ))}
      </View>

      <Button variant="primary" onPress={handleNext} style={styles.button}>
        {isLast ? 'Começar agora' : 'Próximo'}
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
  scroll: {
    flex: 1,
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
  },
  slide: {
    width: SCREEN_WIDTH - theme.spacing.xl * 2,
  },
  photo: {
    flex: 1,
    borderRadius: theme.radius.cardLarge,
  },
  title: {
    marginTop: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.md,
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
