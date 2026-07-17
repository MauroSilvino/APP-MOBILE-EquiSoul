import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Chip } from '../../components/ui/Chip';
import { LineChart } from '../../components/ui/LineChart';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminAnalytics'>;

const TREND_DATA = [55, 50, 40, 44, 28, 32, 15, 20].map((value, i) => ({ label: '', value: 70 - value }));

export function AdminAnalyticsScreen({ navigation }: Props) {
  const paineis = useAdminStore((s) => s.analyticsPaineis);
  const [painel, setPainel] = useState(paineis[0]);
  const { message, show } = useToast();

  return (
    <AdminScreen
      title="Analytics"
      activeRoute="AdminAnalytics"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.chipsRow}>
        {paineis.map((p) => (
          <Chip key={p} label={p} selected={painel === p} onPress={() => setPainel(p)} />
        ))}
      </View>

      <View style={styles.chartCard}>
        <LineChart data={TREND_DATA} min={0} max={70} height={70} />
        <Text variant="sm" weight="semiBold" color="secondary" style={styles.chartCaption}>
          Tendência de {painel} nos últimos 30 dias
        </Text>
      </View>

      <View style={styles.exportRow}>
        <Pressable style={styles.exportButton} onPress={() => show('CSV exportado')}>
          <Text variant="sm" weight="bold">
            Exportar CSV
          </Text>
        </Pressable>
        <Pressable style={styles.exportButton} onPress={() => show('PDF exportado')}>
          <Text variant="sm" weight="bold">
            Exportar PDF
          </Text>
        </Pressable>
      </View>

      <Toast message={message} />
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  chartCard: {
    marginTop: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  chartCaption: {
    marginTop: theme.spacing.sm,
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
