import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceCupons'>;

export function MarketplaceCuponsScreen({ navigation }: Props) {
  const cupons = useMarketplaceStore((state) => state.cupons);
  const toggleCupomAplicado = useMarketplaceStore((state) => state.toggleCupomAplicado);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Cupons
        </Text>

        <View style={styles.list}>
          {cupons.map((cupom) => (
            <Pressable
              key={cupom.id}
              style={[styles.card, cupom.aplicado && styles.cardAplicado]}
              onPress={() => toggleCupomAplicado(cupom.id)}
            >
              <Text variant="sm" weight="bold">
                {cupom.titulo}
              </Text>
              <Text variant="xs" weight="medium" color="secondary" style={styles.validade}>
                Válido até {cupom.validade}
              </Text>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.status}>
                {cupom.aplicado ? 'Aplicado' : 'Disponível'}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(201,161,90,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(201,161,90,0.35)',
    borderStyle: 'dashed',
  },
  cardAplicado: {
    backgroundColor: 'rgba(107,115,83,0.1)',
    borderColor: theme.colors.accent.olive,
  },
  validade: {
    marginTop: 4,
  },
  status: {
    marginTop: 6,
  },
});
