import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalPromocoes'>;

export function PortalPromocoesScreen({ navigation }: Props) {
  const promocoes = usePortalStore((s) => s.promocoes);

  return (
    <PortalScreen
      title="Promoções"
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
      headerRight={
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('PortalNovaPromocao')} accessibilityLabel="Nova promoção">
          <PlusIcon size={16} />
        </Pressable>
      }
    >
      <View style={styles.list}>
        {promocoes.map((p) => (
          <View key={p.nome} style={styles.card}>
            <Text variant="sm" weight="bold">
              {p.nome}
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
              {p.tipo} · válida até {p.validade}
            </Text>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardSubtitle: {
    marginTop: 3,
  },
});
