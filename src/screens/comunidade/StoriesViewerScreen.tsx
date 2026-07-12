import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'StoriesViewer'>;

export function StoriesViewerScreen({ navigation, route }: Props) {
  const stories = useCommunityStore((state) => state.stories);
  const [storyIndex, setStoryIndex] = useState(route.params?.startIndex ?? 0);

  const story = stories[storyIndex];

  function goNext() {
    if (storyIndex < stories.length - 1) {
      setStoryIndex((current) => current + 1);
    } else {
      navigation.navigate('Comunidade');
    }
  }

  function goPrev() {
    setStoryIndex((current) => Math.max(0, current - 1));
  }

  if (!story) return null;

  return (
    <View style={styles.screen}>
      <View style={styles.progressRow}>
        {stories.map((item, index) => (
          <View key={item.id} style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: index <= storyIndex ? '100%' : '0%' }]} />
          </View>
        ))}
      </View>

      <View style={styles.userRow}>
        <View style={styles.avatar} />
        <Text variant="sm" weight="bold" color="inverse">
          {story.user}
        </Text>
      </View>

      <Pressable style={styles.closeButton} onPress={() => navigation.navigate('Comunidade')} hitSlop={8}>
        <CloseIcon size={14} />
      </Pressable>

      <ImagePlaceholder caption={`story · ${story.caption}`} captionColor="rgba(255,255,255,0.6)" style={styles.media} />

      <Text variant="sm" weight="semiBold" color="inverse" style={styles.caption}>
        {story.caption}
      </Text>

      <View style={styles.tapZones}>
        <Pressable style={styles.tapZone} onPress={goPrev} />
        <Pressable style={styles.tapZone} onPress={goNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  progressRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    gap: 4,
    zIndex: 2,
  },
  progressTrack: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  userRow: {
    position: 'absolute',
    top: 26,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    zIndex: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  closeButton: {
    position: 'absolute',
    top: 22,
    right: 14,
    zIndex: 3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  media: {
    flex: 1,
  },
  caption: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 30,
    textAlign: 'center',
  },
  tapZones: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    zIndex: 1,
  },
  tapZone: {
    flex: 1,
  },
});
