import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalFinanceiro'>;

const PERIODOS = ['Diário', 'Semanal', 'Mensal', 'Anual'] as const;

const RECEITA_POR_PERIODO: Record<(typeof PERIODOS)[number], string> = {
  Diário: 'R$ 420',
  Semanal: 'R$ 2.180',
  Mensal: 'R$ 8.420',
  Anual: 'R$ 96.400',
};

export function PortalFinanceiroScreen({ navigation }: Props) {
  const [periodo, setPeriodo] = useState<(typeof PERIODOS)[number]>('Mensal');

  return (
    <PortalScreen
      title="Financeiro"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.chipsRow}>
        {PERIODOS.map((p) => (
          <Chip key={p} label={p} selected={periodo === p} onPress={() => setPeriodo(p)} />
        ))}
      </View>

      <View style={styles.card}>
        <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.cardLabel}>
          RECEITA NO PERÍODO
        </Text>
        <Text variant="xxl" weight="extraBold" style={styles.receita}>
          {RECEITA_POR_PERIODO[periodo]}
        </Text>
        <Svg viewBox="0 0 200 70" width="100%" height={70} style={styles.chart}>
          <Polyline
            points="0,55 30,50 60,42 90,44 120,30 150,34 180,18 200,22"
            fill="none"
            stroke={theme.colors.accent.gold}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <View style={styles.exportRow}>
        <Pressable style={styles.exportButton}>
          <Text variant="xs" weight="bold">
            Exportar CSV
          </Text>
        </Pressable>
        <Pressable style={styles.exportButton}>
          <Text variant="xs" weight="bold">
            Exportar PDF
          </Text>
        </Pressable>
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  card: {
    marginTop: theme.spacing.md,
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 1,
  },
  cardLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  receita: {
    marginTop: 4,
  },
  chart: {
    marginTop: 10,
  },
  exportRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  exportButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
