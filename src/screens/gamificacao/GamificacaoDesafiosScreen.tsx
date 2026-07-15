import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ShieldIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { DESAFIOS_CATALOG, DESAFIO_TIPOS, useGamificationStore } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoDesafios'>;

export function GamificacaoDesafiosScreen({ navigation }: Props) {
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const nomeCavalo = horse?.nome || 'seu cavalo';
  const [tipo, setTipo] = useState<(typeof DESAFIO_TIPOS)[number]>('Individuais');

  const participando = useGamificationStore((state) => state.desafiosParticipando);
  const progresso = useGamificationStore((state) => state.desafiosProgresso);
  const concluidos = useGamificationStore((state) => state.desafiosConcluidos);
  const toggleDesafio = useGamificationStore((state) => state.toggleDesafio);
  const avancarDesafio = useGamificationStore((state) => state.avancarDesafio);

  const lista = DESAFIOS_CATALOG.filter((d) => d.tipo === tipo);
  const temAlgum = DESAFIOS_CATALOG.some((d) => participando.includes(d.id) || concluidos.includes(d.id));

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
              Desafios
            </Text>
          </View>
        </View>

        <View style={styles.chipsRow}>
          {DESAFIO_TIPOS.map((label) => (
            <Chip key={label} label={label} selected={tipo === label} onPress={() => setTipo(label)} />
          ))}
        </View>

        {!temAlgum && (
          <View style={styles.emptyCard}>
            <ShieldIcon size={26} color={theme.colors.text.tertiary} />
            <Text variant="sm" weight="bold" style={styles.emptyTitle}>
              Nenhum desafio ativo ainda
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.emptyText}>
              A IA vai sugerir seu primeiro desafio em breve.
            </Text>
          </View>
        )}

        <View style={styles.lista}>
          {lista.map((d) => {
            const isParticipando = participando.includes(d.id);
            const isConcluido = concluidos.includes(d.id);
            const passos = progresso[d.id] ?? 0;
            const percent = Math.round((passos / d.metaPassos) * 100);

            let label = 'Participar';
            if (isConcluido) label = 'Concluído ✓';
            else if (isParticipando) label = 'Em andamento';

            return (
              <View key={d.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <Text variant="md" weight="bold" style={styles.cardTitulo}>
                    {d.titulo}
                  </Text>
                  <Pressable
                    style={[
                      styles.badge,
                      isConcluido && styles.badgeConcluido,
                      isParticipando && !isConcluido && styles.badgeAndamento,
                    ]}
                    onPress={() => !isConcluido && toggleDesafio(d.id)}
                  >
                    <Text
                      variant="xs"
                      weight="bold"
                      color={isConcluido || isParticipando ? theme.colors.accent.moss : theme.colors.surfaceDark}
                    >
                      {label}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${percent}%` }]} />
                </View>
                <View style={styles.cardBottom}>
                  <Text variant="xs" weight="semiBold" color="secondary">
                    {percent}% concluído
                  </Text>
                  {isParticipando && !isConcluido && (
                    <Pressable onPress={() => avancarDesafio(d.id)}>
                      <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                        + registrar progresso
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.iaCard}>
          <ShieldIcon size={18} />
          <Text variant="xs" weight="medium" color="secondary" style={styles.iaText}>
            A IA cria desafios personalizados para você e {nomeCavalo}.
          </Text>
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
  chipsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  emptyCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.03)',
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    marginTop: theme.spacing.sm,
  },
  emptyText: {
    marginTop: 4,
    textAlign: 'center',
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  cardTitulo: {
    flex: 1,
  },
  badge: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
  },
  badgeAndamento: {
    backgroundColor: 'rgba(138,110,75,0.14)',
  },
  badgeConcluido: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  track: {
    marginTop: theme.spacing.sm,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.06)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.accent.gold,
  },
  cardBottom: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  iaText: {
    flex: 1,
    lineHeight: 18,
  },
});
