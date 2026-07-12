import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, CommentIcon, HeartIcon, ShareIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Reels'>;

const CATEGORIAS = ['Saltos', 'Trilhas', 'Treinos', 'Bastidores'];

export function ReelsScreen({ navigation }: Props) {
  const reels = useCommunityStore((state) => state.reels);
  const toggleLikeReel = useCommunityStore((state) => state.toggleLikeReel);
  const { message, show } = useToast();

  const [reelIndex, setReelIndex] = useState(0);
  const [categoria, setCategoria] = useState('Saltos');

  const reel = reels[reelIndex % reels.length];

  function goNext() {
    setReelIndex((current) => current + 1);
  }

  return (
    <View style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Comunidade')} hitSlop={8}>
        <BackIcon size={15} color="#fff" />
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasRow}>
        <View style={styles.categoriasInner}>
          {CATEGORIAS.map((label) => (
            <Chip key={label} label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.mediaWrapper} onPress={goNext}>
        <ImagePlaceholder caption={`reel · ${reel.caption}`} captionColor="rgba(255,255,255,0.55)" style={styles.media} />
      </Pressable>

      <View style={styles.footer}>
        <Text variant="sm" weight="bold" color="inverse">
          @{reel.user}
        </Text>
        <Text variant="sm" weight="medium" color="inverse" style={styles.caption}>
          {reel.caption}
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.actionItem} onPress={() => toggleLikeReel(reel.id)}>
          <HeartIcon size={26} color="#fff" filled={reel.liked} />
          <Text variant="xs" weight="bold" color="inverse">
            {reel.likesBase + (reel.liked ? 1 : 0)}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Comentarios', { postId: reel.id })}>
          <CommentIcon size={26} color="#fff" />
        </Pressable>
        <Pressable onPress={() => show('Link do reel copiado')}>
          <ShareIcon size={26} color="#fff" />
        </Pressable>
      </View>

      <Toast message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 54,
    left: 16,
    zIndex: 3,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriasRow: {
    position: 'absolute',
    top: 54,
    left: 58,
    right: 0,
    zIndex: 2,
  },
  categoriasInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.xl,
  },
  mediaWrapper: {
    flex: 1,
  },
  media: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 20,
    right: 80,
    bottom: 40,
  },
  caption: {
    marginTop: 6,
  },
  actions: {
    position: 'absolute',
    right: 16,
    bottom: 40,
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  actionItem: {
    alignItems: 'center',
    gap: 3,
  },
});
