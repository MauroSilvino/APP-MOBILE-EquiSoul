import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAgendaStore } from '../../store/useAgendaStore';
import { useHorseStore } from '../../store/useHorseStore';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Analytics'>;

const DIAS_LABEL = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function isoDoDia(base: Date, offsetFromMonday: number): string {
  const dayOfWeek = base.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const data = new Date(base);
  data.setDate(base.getDate() + diffToMonday + offsetFromMonday);
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

export function AnalyticsScreen({ navigation }: Props) {
  const compromissos = useAgendaStore((state) => state.compromissos);
  const memorias = useMemoriesStore((state) => state.memorias);
  const horse = useHorseStore((state) => state.horses[0] ?? null);

  const categorias = useMemo(() => {
    const contar = (tipo: string) => compromissos.filter((c) => c.tipo === tipo).length;
    return [
      { valor: String(contar('Treino')), label: 'Treinos', onPress: () => navigation.navigate('Evolucao') },
      { valor: String(contar('Passeio')), label: 'Passeios', onPress: () => navigation.navigate('Evolucao') },
      { valor: String(contar('Evento')), label: 'Eventos', onPress: () => navigation.navigate('Evolucao') },
      { valor: String(contar('Competição')), label: 'Competições', onPress: () => navigation.navigate('Evolucao') },
      { valor: String(memorias.length), label: 'Memórias', onPress: () => navigation.navigate('Timeline') },
      {
        valor: horse?.relationship?.tempoJuntos || '—',
        label: 'Tempo junto',
        onPress: () => navigation.navigate('LinhaTempoAnalitica'),
      },
    ];
  }, [compromissos, memorias, horse, navigation]);

  const atividadeSemana = useMemo(() => {
    const hoje = new Date();
    return DIAS_LABEL.map((label, index) => {
      const isoDia = isoDoDia(hoje, index);
      const count = compromissos.filter((c) => c.data === isoDia).length;
      return { label, pct: Math.min(100, count * 34) };
    });
  }, [compromissos]);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Analytics
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Sua evolução, em poucos números e muita história.
        </Text>

        <View style={styles.categoriasGrid}>
          {categorias.map((c) => (
            <Pressable key={c.label} style={styles.categoriaCard} onPress={c.onPress}>
              <Text variant="xl" weight="extraBold">
                {c.valor}
              </Text>
              <Text variant="sm" weight="semiBold" color="secondary" style={styles.categoriaLabel}>
                {c.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          ATIVIDADE — ÚLTIMOS 7 DIAS
        </Text>
        <View style={styles.chartCard}>
          <View style={styles.bars}>
            {atividadeSemana.map((b) => (
              <View key={b.label} style={styles.barColumn}>
                <View style={[styles.bar, { height: `${Math.max(b.pct, 2)}%` }]} />
              </View>
            ))}
          </View>
          <View style={styles.barLabels}>
            {atividadeSemana.map((b) => (
              <Text key={b.label} variant="xs" weight="semiBold" color="tertiary" style={styles.barLabel}>
                {b.label}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('Evolucao')}>
            <Text variant="sm" weight="bold">
              Evolução
            </Text>
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => navigation.navigate('LinhaTempoAnalitica')}>
            <Text variant="sm" weight="bold">
              Linha do tempo
            </Text>
          </Pressable>
        </View>
        <Pressable style={styles.relatoriosButton} onPress={() => navigation.navigate('Relatorios')}>
          <Text variant="sm" weight="bold">
            Relatórios
          </Text>
        </Pressable>
      </ScrollView>

      <BottomTabBar active="Home" />
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
    paddingBottom: 130,
  },
  subtitle: {
    marginTop: 4,
  },
  categoriasGrid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  categoriaCard: {
    width: '47%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  categoriaLabel: {
    marginTop: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chartCard: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
    height: 90,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 6,
    backgroundColor: theme.colors.accent.olive,
  },
  barLabels: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  barLabel: {
    flex: 1,
    textAlign: 'center',
  },
  actionsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  relatoriosButton: {
    marginTop: theme.spacing.sm,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
