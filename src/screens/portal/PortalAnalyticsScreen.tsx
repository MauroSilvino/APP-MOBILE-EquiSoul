import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalAnalytics'>;

const INDICADORES = [
  { valor: '62', label: 'Clientes ativos' },
  { valor: '128', label: 'Atendimentos' },
  { valor: '4.9', label: 'Avaliação média' },
  { valor: '18%', label: 'Taxa de retorno' },
  { valor: 'R$ 132', label: 'Ticket médio' },
  { valor: '94%', label: 'Taxa de comparecimento' },
];

export function PortalAnalyticsScreen({ navigation }: Props) {
  return (
    <PortalScreen
      title="Analytics"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.grid}>
        {INDICADORES.map((i) => (
          <View key={i.label} style={styles.card}>
            <Text variant="lg" weight="extraBold">
              {i.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.cardLabel}>
              {i.label}
            </Text>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '47%',
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardLabel: {
    marginTop: 2,
    textAlign: 'center',
  },
});
