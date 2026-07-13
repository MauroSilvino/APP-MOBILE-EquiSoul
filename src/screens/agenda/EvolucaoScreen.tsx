import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Evolucao'>;

const PERIODOS = ['7 dias', '30 dias', '90 dias', '1 ano'];

const INDICADORES = [
  { valor: '22', label: 'Dias ativos' },
  { valor: '14', label: 'Treinos' },
  { valor: '6', label: 'Passeios' },
  { valor: '2', label: 'Eventos' },
  { valor: '48', label: 'Memórias' },
  { valor: '5', label: 'Conquistas' },
];

const TENDENCIA = [
  { label: 'S1', pct: 45 },
  { label: 'S2', pct: 60 },
  { label: 'S3', pct: 50 },
  { label: 'S4', pct: 80 },
  { label: 'S5', pct: 70 },
  { label: 'S6', pct: 95 },
];

export function EvolucaoScreen({ navigation }: Props) {
  const [periodo, setPeriodo] = useState('30 dias');

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Evolução
          </Text>
        </View>

        <View style={styles.chipsRow}>
          {PERIODOS.map((label) => {
            const selected = periodo === label;
            return (
              <Pressable
                key={label}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setPeriodo(label)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.indicadoresGrid}>
          {INDICADORES.map((i) => (
            <View key={i.label} style={styles.indicadorCard}>
              <Text variant="lg" weight="extraBold">
                {i.valor}
              </Text>
              <Text variant="xs" weight="semiBold" color="secondary" style={styles.indicadorLabel}>
                {i.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartCard}>
          <Text variant="xs" weight="bold" style={styles.chartTitle}>
            DIAS ATIVOS POR SEMANA
          </Text>
          <View style={styles.bars}>
            {TENDENCIA.map((b) => (
              <View key={b.label} style={styles.barColumn}>
                <View style={[styles.bar, { height: `${b.pct}%` }]} />
              </View>
            ))}
          </View>
          <View style={styles.barLabels}>
            {TENDENCIA.map((b) => (
              <Text key={b.label} variant="xs" weight="semiBold" color="tertiary" style={styles.barLabel}>
                {b.label}
              </Text>
            ))}
          </View>
        </View>

        <Text variant="sm" weight="medium" color="secondary" style={styles.resumo}>
          Vocês mantiveram uma rotina consistente neste período, com destaque para o aumento de passeios
          registrados.
        </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  indicadoresGrid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  indicadorCard: {
    width: '47%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  indicadorLabel: {
    marginTop: 2,
  },
  chartCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  chartTitle: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: theme.spacing.sm,
  },
  bars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: theme.spacing.sm,
    height: 80,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 6,
    backgroundColor: theme.colors.accent.leather,
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
  resumo: {
    marginTop: theme.spacing.lg,
    lineHeight: 22,
  },
});
