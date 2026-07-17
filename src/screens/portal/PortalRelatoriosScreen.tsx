import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalRelatorios'>;

const INDICADORES = [
  { valor: 'R$ 96.400', label: 'Receita' },
  { valor: '320', label: 'Clientes' },
  { valor: '3.2%', label: 'Conversão' },
  { valor: 'R$ 210', label: 'Ticket médio' },
  { valor: '4', label: 'Cancelamentos' },
  { valor: '4.7 ★', label: 'Avaliações' },
];

const MAIS_VENDIDOS = [
  { nome: 'Manta térmica', qtd: 64 },
  { nome: 'Suplemento articular', qtd: 51 },
  { nome: 'Cabresto de couro', qtd: 38 },
];

export function PortalRelatoriosScreen({ navigation }: Props) {
  return (
    <PortalScreen
      title="Relatórios"
      activeModule="PortalLoja"
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

      <Text variant="xs" weight="bold" style={styles.sectionTitle}>
        PRODUTOS MAIS VENDIDOS
      </Text>
      <View style={styles.list}>
        {MAIS_VENDIDOS.map((p) => (
          <View key={p.nome} style={styles.row}>
            <Text variant="sm" weight="semiBold">
              {p.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color={theme.colors.accent.leather}>
              {p.qtd} vendidos
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
  sectionTitle: {
    marginTop: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
});
