import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalLoja'>;

type Target = 'PortalProdutos' | 'PortalPedidos' | 'PortalRelatorios' | 'PortalPromocoes' | 'PortalEstoque' | null;

const CARDS: { valor: string; label: string; target: Target }[] = [
  { valor: '48', label: 'Produtos', target: 'PortalProdutos' },
  { valor: '12', label: 'Pedidos abertos', target: 'PortalPedidos' },
  { valor: '320', label: 'Clientes', target: null },
  { valor: 'R$ 96.400', label: 'Receita', target: 'PortalRelatorios' },
  { valor: '3', label: 'Promoções ativas', target: 'PortalPromocoes' },
  { valor: '5', label: 'Baixo estoque', target: 'PortalEstoque' },
  { valor: '4.7 ★', label: 'Avaliações', target: null },
];

export function PortalLojaScreen({ navigation }: Props) {
  return (
    <PortalScreen title="Minha loja" activeModule="PortalLoja" onNavigateModule={(route) => navigation.navigate(route)}>
      <View style={styles.grid}>
        {CARDS.map((c) => (
          <Pressable
            key={c.label}
            style={styles.card}
            disabled={!c.target}
            onPress={() => c.target && navigation.navigate(c.target)}
          >
            <Text variant="lg" weight="extraBold">
              {c.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.cardLabel}>
              {c.label}
            </Text>
          </Pressable>
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
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardLabel: {
    marginTop: 2,
  },
});
