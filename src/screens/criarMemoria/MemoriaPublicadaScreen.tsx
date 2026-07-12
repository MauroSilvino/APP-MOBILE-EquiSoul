import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { FavoriteToggle } from '../../components/ui/FavoriteToggle';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { CommentIcon, ShareIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MemoriaPublicada'>;

export function MemoriaPublicadaScreen({ navigation, route }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const toggleFavorito = useMemoriesStore((state) => state.toggleFavorito);
  const ultimaMemoriaId = useMemoriesStore((state) => state.ultimaMemoriaId);
  const { message, show } = useToast();

  const memoriaId = route.params?.id ?? ultimaMemoriaId ?? memorias[0]?.id;
  const memoria = memorias.find((item) => item.id === memoriaId) ?? memorias[0];

  if (!memoria) {
    return (
      <Screen>
        <Text variant="md" color="secondary" style={styles.empty}>
          Nenhuma memória publicada ainda.
        </Text>
      </Screen>
    );
  }

  const aiInsight = memoria.nota || `Este momento com ${memoria.tipo.toLowerCase()} vale a pena ser lembrado.`;

  function compartilhar() {
    Share.share({ message: `${memoria!.titulo}\n${memoria!.nota}` });
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <ImagePlaceholder style={styles.hero} caption={`foto · ${memoria.titulo}`} />
        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            {memoria.titulo}
          </Text>
          <Text variant="md" weight="medium" color="secondary" style={styles.texto}>
            {memoria.subtitulo || 'Uma página a mais na história de vocês dois.'}
          </Text>

          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text variant="xs" weight="semiBold">
                ☀ 24°C
              </Text>
            </View>
            {!!memoria.local && (
              <View style={styles.tag}>
                <Text variant="xs" weight="semiBold">
                  {memoria.local}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.actions}>
            <FavoriteToggle favorito={memoria.favorito} onToggle={() => toggleFavorito(memoria!.id)} />
            <CommentIcon />
            <Pressable onPress={compartilhar}>
              <ShareIcon />
            </Pressable>
            <View style={styles.actionsSpacer} />
            <Pressable onPress={() => navigation.navigate('TipoMemoria')}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                Editar
              </Text>
            </Pressable>
          </View>

          <View style={styles.iaCard}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.iaEyebrow}>
              A IA PERCEBEU
            </Text>
            <Text variant="sm" weight="bold" color="inverse" style={styles.iaText}>
              {aiInsight}
            </Text>
            <View style={styles.iaLinks}>
              <Pressable onPress={() => show('Carta gerada pela IA!')}>
                <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                  Gerar carta
                </Text>
              </Pressable>
              <Pressable onPress={() => show('Gerando vídeo...')}>
                <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                  Criar vídeo
                </Text>
              </Pressable>
              <Pressable onPress={() => show('Adicionado ao álbum "Nossa Jornada"!')}>
                <Text variant="sm" weight="bold" color={theme.colors.accent.gold}>
                  Adicionar ao álbum
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.secondaryRow}>
            <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Historico')}>
              <Text variant="sm" weight="bold">
                Ver histórico
              </Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('AlbunsInteligentes')}>
              <Text variant="sm" weight="bold">
                Ver álbuns
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Toast message={message} />
      <BottomTabBar active="Timeline" />
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
  hero: {
    height: 280,
  },
  body: {
    padding: theme.spacing.xl,
  },
  texto: {
    marginTop: theme.spacing.sm,
  },
  tags: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  actionsSpacer: {
    flex: 1,
  },
  iaCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.card,
    padding: theme.cardPadding.max,
    backgroundColor: theme.colors.surfaceDark,
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.xs,
  },
  iaLinks: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.lg,
  },
  secondaryRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
});
