import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useUserStore } from '../../store/useUserStore';
import {
  RANKING_CATEGORIAS,
  RANKING_ESCOPOS,
  RANKING_OUTROS,
  useGamificationStore,
} from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoRanking'>;

export function GamificacaoRankingScreen({ navigation }: Props) {
  const [categoria, setCategoria] = useState<(typeof RANKING_CATEGORIAS)[number]>('Colaboração');
  const [escopo, setEscopo] = useState<(typeof RANKING_ESCOPOS)[number]>('Amigos');
  const pontos = useGamificationStore((state) => state.pontos);
  const profile = useUserStore((state) => state.profile);

  const lista = useMemo(() => {
    const voce = { id: 'voce', nome: profile.nome || 'Você', pontos };
    const combinada = [...RANKING_OUTROS, voce].sort((a, b) => b.pontos - a.pontos);
    return combinada.map((entry, index) => ({ ...entry, pos: `${index + 1}º` }));
  }, [pontos, profile.nome]);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Voltar ao centro de evolução"
            style={styles.backButton}
            onPress={() => navigation.navigate('GamificacaoHub')}
            hitSlop={8}
          >
            <BackIcon size={15} strokeWidth={2.2} />
          </Pressable>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Ranking
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Reconhece contribuições — nunca apenas curtidas.
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {RANKING_CATEGORIAS.map((label) => (
            <View key={label} style={styles.chipWrap}>
              <Chip label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
            </View>
          ))}
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRowSecondary}>
          {RANKING_ESCOPOS.map((label) => (
            <View key={label} style={styles.chipWrap}>
              <Chip label={label} selected={escopo === label} onPress={() => setEscopo(label)} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.lista}>
          {lista.map((r) => (
            <View key={r.id} style={[styles.row, r.id === 'voce' && styles.rowVoce]}>
              <Text variant="md" weight="extraBold" color={theme.colors.accent.leather} style={styles.pos}>
                {r.pos}
              </Text>
              <ImagePlaceholder caption="" style={styles.avatar} />
              <Text variant="sm" weight="bold" style={styles.nome}>
                {r.nome}
              </Text>
              <Text variant="xs" weight="bold" color="secondary">
                {r.pontos} pts
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  eyebrow: {
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
  },
  chipsRowSecondary: {
    marginTop: theme.spacing.sm,
  },
  chipWrap: {
    marginRight: theme.spacing.sm,
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  rowVoce: {
    backgroundColor: 'rgba(201,161,90,0.14)',
  },
  pos: {
    width: 20,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  nome: {
    flex: 1,
  },
});
