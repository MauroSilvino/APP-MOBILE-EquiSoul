import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ADMIN_MODULES } from '../../components/admin/adminModules';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminDashboard'>;

const PERIODOS = ['Tempo real', '7 dias', '30 dias', '12 meses'] as const;
type Periodo = (typeof PERIODOS)[number];

const KPIS_POR_PERIODO: Record<Periodo, [string, string][]> = {
  'Tempo real': [
    ['Usuários online', '3.402'], ['Novos cadastros', '14'], ['DAU', '3.4k'], ['MAU', '96.2k'], ['Retenção', '64%'],
    ['Premium', '12.900'], ['Receita', 'R$ 1.1k'], ['Eventos', '3'], ['Marketplace', 'R$ 820'], ['Uso da IA', '640'],
    ['Uploads', '210'], ['Notificações', '4.1k'], ['Chamados', '4'],
  ],
  '7 dias': [
    ['Usuários online', '3.402'], ['Novos cadastros', '812'], ['DAU', '18.4k'], ['MAU', '96.2k'], ['Retenção', '64%'],
    ['Premium', '12.900'], ['Receita', 'R$ 482k'], ['Eventos', '128'], ['Marketplace', 'R$ 96k'], ['Uso da IA', '221k'],
    ['Uploads', '54.1k'], ['Notificações', '1.2M'], ['Chamados', '86'],
  ],
  '30 dias': [
    ['Usuários online', '3.402'], ['Novos cadastros', '3.140'], ['DAU', '19.1k'], ['MAU', '98.6k'], ['Retenção', '61%'],
    ['Premium', '13.450'], ['Receita', 'R$ 1.9M'], ['Eventos', '512'], ['Marketplace', 'R$ 384k'], ['Uso da IA', '890k'],
    ['Uploads', '212k'], ['Notificações', '4.8M'], ['Chamados', '340'],
  ],
  '12 meses': [
    ['Usuários online', '3.402'], ['Novos cadastros', '38.2k'], ['DAU', '21.6k'], ['MAU', '104k'], ['Retenção', '58%'],
    ['Premium', '15.800'], ['Receita', 'R$ 22.4M'], ['Eventos', '6.140'], ['Marketplace', 'R$ 4.6M'], ['Uso da IA', '10.2M'],
    ['Uploads', '2.5M'], ['Notificações', '58M'], ['Chamados', '4.1k'],
  ],
};

const ALERTAS = [
  { texto: 'Latência elevada no serviço de vídeos IA', danger: true },
  { texto: 'Custo de IA 18% acima da média mensal', danger: false },
  { texto: 'Uso de storage em 82% da capacidade', danger: false },
];

export function AdminDashboardScreen({ navigation }: Props) {
  const [periodo, setPeriodo] = useState<Periodo>('7 dias');
  const kpis = KPIS_POR_PERIODO[periodo];
  const moduloAtalhos = ADMIN_MODULES.slice(1);

  return (
    <AdminScreen
      title="Dashboard"
      activeRoute="AdminDashboard"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.chipsRow}>
        {PERIODOS.map((p) => (
          <Chip key={p} label={p} selected={periodo === p} onPress={() => setPeriodo(p)} />
        ))}
      </View>

      <View style={styles.kpiGrid}>
        {kpis.map(([label, valor]) => (
          <View key={label} style={styles.kpiCard}>
            <Text variant="lg" weight="extraBold">
              {valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.kpiLabel}>
              {label}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        ALERTAS
      </Text>
      <View style={styles.alertList}>
        {ALERTAS.map((a) => (
          <View key={a.texto} style={[styles.alertRow, a.danger ? styles.alertDanger : styles.alertWarn]}>
            <Text
              variant="sm"
              weight="semiBold"
              color={a.danger ? theme.colors.error : theme.colors.accent.leather}
            >
              ⚠
            </Text>
            <Text variant="sm" weight="semiBold" style={styles.alertText}>
              {a.texto}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        ATALHOS
      </Text>
      <View style={styles.atalhosGrid}>
        {moduloAtalhos.map((m) => (
          <Pressable key={m.route} style={styles.atalhoCard} onPress={() => navigation.navigate(m.route)}>
            <Text variant="sm" weight="bold">
              {m.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  kpiGrid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  kpiCard: {
    width: '32%',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  kpiLabel: {
    marginTop: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  alertList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 14,
    padding: 12,
  },
  alertDanger: {
    backgroundColor: 'rgba(184,92,76,0.12)',
  },
  alertWarn: {
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
  alertText: {
    flex: 1,
  },
  atalhosGrid: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  atalhoCard: {
    width: '48.5%',
    borderRadius: 12,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
});
