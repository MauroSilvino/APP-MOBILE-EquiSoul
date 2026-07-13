import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { ChevronRightIcon, WalletIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Carteira'>;

export function CarteiraScreen({ navigation }: Props) {
  const saldoCashback = useMarketplaceStore((state) => state.saldoCashback);
  const metodosPagamento = useMarketplaceStore((state) => state.metodosPagamento);
  const cupons = useMarketplaceStore((state) => state.cupons);
  const transacoesCarteira = useMarketplaceStore((state) => state.transacoesCarteira);
  const cupomDestaque = cupons[0];

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Carteira
        </Text>

        <View style={styles.saldoCard}>
          <Text variant="xs" weight="semiBold" color={theme.colors.accent.gold} style={styles.saldoLabel}>
            SALDO EM CASHBACK
          </Text>
          <Text variant="xxl" weight="extraBold" color="inverse" style={styles.saldoValor}>
            {saldoCashback}
          </Text>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MÉTODOS DE PAGAMENTO
        </Text>
        <View style={styles.metodosList}>
          {metodosPagamento.map((metodo) => (
            <View key={metodo.id} style={styles.metodoCard}>
              <WalletIcon size={20} color={theme.colors.accent.olive} />
              <Text variant="md" weight="bold">
                {metodo.label}
              </Text>
            </View>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MOVIMENTAÇÕES
        </Text>
        <View style={styles.transacoesList}>
          {transacoesCarteira.map((transacao) => (
            <View key={transacao.id} style={styles.transacaoRow}>
              <View style={styles.transacaoInfo}>
                <Text variant="sm" weight="bold">
                  {transacao.descricao}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.transacaoData}>
                  {transacao.data}
                </Text>
              </View>
              <Text
                variant="sm"
                weight="bold"
                color={transacao.tipo === 'entrada' ? theme.colors.accent.moss : theme.colors.error}
              >
                {transacao.tipo === 'entrada' ? '+' : '−'} {transacao.valorLabel}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text variant="xs" weight="bold" style={styles.sectionLabelNoMargin}>
            CUPONS
          </Text>
          <Pressable onPress={() => navigation.navigate('MarketplaceCupons')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              ver todos
            </Text>
          </Pressable>
        </View>
        {!!cupomDestaque && (
          <Pressable style={styles.cupomCard} onPress={() => navigation.navigate('MarketplaceCupons')}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              {cupomDestaque.titulo} · válido até {cupomDestaque.validade}
            </Text>
          </Pressable>
        )}

        <Pressable style={styles.historicoRow} onPress={() => navigation.navigate('MarketplaceHistorico')}>
          <Text variant="md" weight="bold">
            Ver histórico completo
          </Text>
          <ChevronRightIcon size={16} />
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl + 12,
    paddingBottom: 130,
  },
  saldoCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.surfaceDark,
  },
  saldoLabel: {
    letterSpacing: 0.5,
  },
  saldoValor: {
    marginTop: 6,
  },
  sectionHeaderRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionLabelNoMargin: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metodosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  metodoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  transacoesList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  transacaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  transacaoInfo: {
    flex: 1,
    minWidth: 0,
    marginRight: theme.spacing.sm,
  },
  transacaoData: {
    marginTop: 2,
  },
  cupomCard: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(201,161,90,0.1)',
  },
  historicoRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
});
