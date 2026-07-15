import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceAvaliacoes'>;

export function MarketplaceAvaliacoesScreen({ navigation, route }: Props) {
  const avaliacoes = useMarketplaceStore((state) => state.avaliacoes);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xl" weight="extraBold">
          Avaliações
        </Text>
        {!!route.params?.nome && (
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.meta}>
            {route.params.nome} · ★ {route.params.nota}
          </Text>
        )}

        <View style={styles.list}>
          {avaliacoes.map((avaliacao) => (
            <View key={avaliacao.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text variant="sm" weight="bold">
                  {avaliacao.autor}
                </Text>
                <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                  ★ {avaliacao.nota}
                </Text>
              </View>
              <Text variant="xs" weight="medium" color="secondary" style={styles.cardTexto}>
                {avaliacao.texto}
              </Text>
            </View>
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
  meta: {
    marginTop: 4,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTexto: {
    marginTop: 6,
    lineHeight: 18,
  },
});
