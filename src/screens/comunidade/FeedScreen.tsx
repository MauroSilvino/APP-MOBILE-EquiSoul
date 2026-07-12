import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { CommunityTabs } from '../../components/comunidade/CommunityTabs';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { CloseIcon, CommentIcon, HeartIcon, ReelsIcon, SaveIcon, ShareIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Post, useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Comunidade'>;

export function FeedScreen({ navigation }: Props) {
  const posts = useCommunityStore((state) => state.posts);
  const stories = useCommunityStore((state) => state.stories);
  const eventos = useCommunityStore((state) => state.eventos);
  const toggleLikePost = useCommunityStore((state) => state.toggleLikePost);
  const toggleSavePost = useCommunityStore((state) => state.toggleSavePost);
  const seguindoSugestao = useCommunityStore((state) => state.seguindoSugestao);
  const sugestaoDispensada = useCommunityStore((state) => state.sugestaoDispensada);
  const toggleSeguirSugestao = useCommunityStore((state) => state.toggleSeguirSugestao);
  const dispensarSugestao = useCommunityStore((state) => state.dispensarSugestao);
  const { message, show } = useToast();

  const proximoEvento = eventos[0];

  function likesLabel(post: Post) {
    const total = post.likesBase + (post.liked ? 1 : 0);
    return `${total} curtidas`;
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Comunidade
          </Text>
          <Pressable onPress={() => navigation.navigate('Reels')} hitSlop={8}>
            <ReelsIcon />
          </Pressable>
        </View>

        <CommunityTabs active="Feed" />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow}>
          <View style={styles.storiesInner}>
            {stories.map((story, index) => (
              <Pressable
                key={story.id}
                style={styles.storyItem}
                onPress={() => navigation.navigate('StoriesViewer', { startIndex: index })}
              >
                <View style={styles.storyRing}>
                  <View style={styles.storyAvatar} />
                </View>
                <Text variant="xs" weight="semiBold" color="secondary">
                  {story.nome}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.posts}>
          {posts.map((post, index) => (
            <View key={post.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar} />
                <View style={styles.cardHeaderText}>
                  <Text variant="sm" weight="bold">
                    {post.autor}
                    {!!post.comCavalo && (
                      <Text variant="sm" weight="medium" color="secondary">
                        {' '}
                        com {post.comCavalo}
                      </Text>
                    )}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary">
                    {post.local}
                  </Text>
                </View>
              </View>

              <ImagePlaceholder caption={post.fotoLabel} style={styles.photo} />

              <View style={styles.cardBody}>
                <Text variant="sm" weight="medium">
                  {post.texto}
                </Text>

                {!!post.iaComentario && (
                  <View style={styles.iaCard}>
                    <Text variant="xs" weight="semiBold" color={theme.colors.accent.moss} style={styles.iaEyebrow}>
                      IA
                    </Text>
                    <Text variant="sm" weight="semiBold" style={styles.iaText}>
                      {post.iaComentario}
                    </Text>
                  </View>
                )}

                <View style={styles.actionsRow}>
                  <Pressable onPress={() => toggleLikePost(post.id)} hitSlop={8}>
                    <HeartIcon filled={post.liked} color={theme.colors.accent.gold} />
                  </Pressable>
                  <Pressable onPress={() => navigation.navigate('Comentarios', { postId: post.id })} hitSlop={8}>
                    <CommentIcon />
                  </Pressable>
                  <Pressable onPress={() => show('Link do post copiado')} hitSlop={8}>
                    <ShareIcon />
                  </Pressable>
                  {index === 0 && (
                    <>
                      <View style={styles.spacer} />
                      <Pressable onPress={() => toggleSavePost(post.id)} hitSlop={8}>
                        <SaveIcon filled={post.saved} />
                      </Pressable>
                    </>
                  )}
                </View>
                <Text variant="xs" weight="bold" color="secondary" style={styles.likesLabel}>
                  {likesLabel(post)} · {post.comentarios.length} comentários
                </Text>
              </View>
            </View>
          ))}

          {!sugestaoDispensada && (
            <View style={styles.sugestao}>
              <View style={styles.sugestaoAvatar} />
              <View style={styles.sugestaoText}>
                <Text variant="sm" weight="bold">
                  Sugestão para você
                </Text>
                <Text variant="xs" weight="medium" color="secondary">
                  Carlos Melo · adestramento, como você
                </Text>
              </View>
              <Pressable
                style={[styles.seguirButton, seguindoSugestao && styles.seguirButtonAtivo]}
                onPress={toggleSeguirSugestao}
              >
                <Text variant="xs" weight="bold" color={seguindoSugestao ? theme.colors.accent.moss : 'primary'}>
                  {seguindoSugestao ? 'Seguindo ✓' : 'Seguir'}
                </Text>
              </Pressable>
              <Pressable style={styles.dismissButton} onPress={dispensarSugestao} hitSlop={8}>
                <CloseIcon />
              </Pressable>
            </View>
          )}

          {!!proximoEvento && (
            <Pressable
              style={styles.eventoCard}
              onPress={() => navigation.navigate('EventoDetalhe', { id: proximoEvento.id })}
            >
              <View style={styles.eventoThumb} />
              <View style={styles.eventoText}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.eventoEyebrow}>
                  Evento próximo
                </Text>
                <Text variant="md" weight="bold" color="inverse" style={styles.eventoTitulo}>
                  {proximoEvento.titulo}
                </Text>
                <Text variant="xs" weight="medium" style={styles.eventoInfo}>
                  {proximoEvento.data} · {proximoEvento.participantes} participantes
                </Text>
              </View>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <BottomTabBar active="Comunidade" />
      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 130,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storiesRow: {
    marginTop: theme.spacing.lg,
    paddingLeft: theme.spacing.xl,
  },
  storiesInner: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  storyItem: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  storyRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: theme.colors.accent.gold,
    padding: 2.5,
  },
  storyAvatar: {
    flex: 1,
    borderRadius: 27,
    backgroundColor: theme.colors.placeholder.background,
  },
  posts: {
    marginTop: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    padding: theme.spacing.md,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardHeaderText: {
    minWidth: 0,
  },
  photo: {
    height: 340,
  },
  cardBody: {
    padding: theme.spacing.md,
  },
  iaCard: {
    marginTop: theme.spacing.sm,
    borderRadius: 14,
    padding: theme.cardPadding.min,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: 4,
  },
  actionsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  spacer: {
    flex: 1,
  },
  likesLabel: {
    marginTop: theme.spacing.sm,
  },
  sugestao: {
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(201,161,90,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  sugestaoAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.placeholder.background,
  },
  sugestaoText: {
    flex: 1,
    minWidth: 0,
  },
  seguirButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
  },
  seguirButtonAtivo: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  dismissButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventoCard: {
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceDark,
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  eventoThumb: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: 'rgba(251,249,244,0.15)',
  },
  eventoText: {
    minWidth: 0,
    flex: 1,
    justifyContent: 'center',
  },
  eventoEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  eventoTitulo: {
    marginTop: 4,
  },
  eventoInfo: {
    marginTop: 2,
    color: 'rgba(251,249,244,0.7)',
  },
});
