import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GrupoDetalhe'>;

const TABS = ['Feed', 'Eventos', 'Arquivos', 'Chat'];
const VAZIO_LABELS: Record<string, string> = {
  Eventos: 'Nenhum evento marcado por este grupo ainda.',
  Arquivos: 'Nenhum arquivo compartilhado ainda.',
  Chat: 'O chat do grupo abre em breve.',
};

export function GrupoDetalheScreen({ navigation, route }: Props) {
  const grupos = useCommunityStore((state) => state.grupos);
  const toggleEntrarGrupo = useCommunityStore((state) => state.toggleEntrarGrupo);

  const [tab, setTab] = useState('Feed');

  const grupo = grupos.find((item) => item.id === route.params.id) ?? grupos[0];

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Grupos')} hitSlop={8}>
          <BackIcon />
        </Pressable>

        <ImagePlaceholder caption="capa · grupo" style={styles.cover} />

        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            {grupo.nome}
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
            {grupo.membros} membros · grupo {grupo.publico ? 'público' : 'privado'}
          </Text>

          <Pressable
            style={[styles.entrarButton, grupo.entrou && styles.entrarButtonAtivo]}
            onPress={() => toggleEntrarGrupo(grupo.id)}
          >
            <Text variant="md" weight="extraBold">
              {grupo.entrou ? 'Você faz parte ✓' : 'Entrar no grupo'}
            </Text>
          </Pressable>

          <View style={styles.tabsRow}>
            {TABS.map((label) => (
              <Pressable key={label} onPress={() => setTab(label)}>
                <Text variant="sm" weight="bold" color={tab === label ? 'primary' : theme.colors.text.tertiary}>
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === 'Feed' ? (
            <View style={styles.feed}>
              {grupo.posts.length === 0 ? (
                <Text variant="sm" weight="medium" color="secondary" style={styles.feedEmpty}>
                  Nenhuma publicação ainda.
                </Text>
              ) : (
                grupo.posts.map((post, index) => (
                  <View key={index} style={styles.postCard}>
                    <View style={styles.postAvatar} />
                    <View style={styles.postText}>
                      <Text variant="sm" weight="bold">
                        {post.autor}
                      </Text>
                      <Text variant="sm" weight="medium" color="secondary" style={styles.postTexto}>
                        {post.texto}
                      </Text>
                    </View>
                  </View>
                ))
              )}
            </View>
          ) : (
            <Text variant="sm" weight="medium" color="secondary" style={styles.tabVazio}>
              {VAZIO_LABELS[tab]}
            </Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
  cover: {
    height: 160,
  },
  body: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  subtitle: {
    marginTop: 4,
  },
  entrarButton: {
    marginTop: theme.spacing.lg,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  entrarButtonAtivo: {
    backgroundColor: 'rgba(107,115,83,0.2)',
  },
  tabsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  feed: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  feedEmpty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  postCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  postAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  postText: {
    flex: 1,
    minWidth: 0,
  },
  postTexto: {
    marginTop: 2,
  },
  tabVazio: {
    marginTop: 40,
    textAlign: 'center',
    lineHeight: 22,
  },
});
