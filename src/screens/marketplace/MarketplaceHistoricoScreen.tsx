import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceHistorico'>;

export function MarketplaceHistoricoScreen({ navigation }: Props) {
  const reservas = useMarketplaceStore((state) => state.reservas);

  return (
    <Screen style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>
      <Text variant="xxl" weight="extraBold">
        Histórico
      </Text>

      {reservas.length > 0 ? (
        <ScrollView contentContainerStyle={styles.list}>
          {reservas.map((reserva) => (
            <View key={reserva.id} style={styles.itemCard}>
              <View style={styles.itemThumb} />
              <View style={styles.itemInfo}>
                <Text variant="sm" weight="bold">
                  {reserva.origem} · {reserva.nome}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.itemData}>
                  {reserva.data} às {reserva.horario}
                </Text>
              </View>
              <View style={styles.statusBadge}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.moss}>
                  {reserva.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
          Nenhum pedido ou reserva ainda.
        </Text>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  itemCard: {
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
  itemThumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  itemInfo: {
    flex: 1,
    minWidth: 0,
  },
  itemData: {
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
  },
});
