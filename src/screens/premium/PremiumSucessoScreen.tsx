import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumSucesso'>;

export function PremiumSucessoScreen({ navigation, route }: Props) {
  const checkout = route.params;
  const titulo = checkout.tipo === 'avulso' ? 'Compra confirmada!' : 'Assinatura confirmada!';

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CheckIcon size={30} color={theme.colors.accent.olive} strokeWidth={2.4} />
        </View>
        <Text variant="xl" weight="extraBold" style={styles.titulo}>
          {titulo}
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitulo}>
          Obrigado por apoiar a jornada do EquiSoul.
        </Text>

        <View style={styles.resumoCard}>
          <View style={styles.resumoRow}>
            <Text variant="xs" weight="semiBold" color="secondary">
              Item
            </Text>
            <Text variant="sm" weight="bold">
              {checkout.titulo}
            </Text>
          </View>
          <View style={styles.resumoRow}>
            <Text variant="xs" weight="semiBold" color="secondary">
              Valor
            </Text>
            <Text variant="sm" weight="bold">
              {checkout.preco}
            </Text>
          </View>
          {checkout.recorrente && (
            <View style={styles.resumoRow}>
              <Text variant="xs" weight="semiBold" color="secondary">
                Próxima cobrança
              </Text>
              <Text variant="sm" weight="bold">
                {checkout.proximaCobranca}
              </Text>
            </View>
          )}
        </View>

        <Pressable
          style={styles.concluirButton}
          onPress={() => navigation.navigate('PremiumHome')}
        >
          <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
            Concluir
          </Text>
        </Pressable>

        {checkout.recorrente && (
          <Pressable onPress={() => navigation.navigate('PremiumGerenciarAssinatura')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.olive} style={styles.gerenciarLink}>
              Gerenciar assinatura
            </Text>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: theme.spacing.xl,
    alignItems: 'center',
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(107,115,83,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  subtitulo: {
    marginTop: 6,
    textAlign: 'center',
  },
  resumoCard: {
    marginTop: theme.spacing.xl,
    width: '100%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  resumoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  concluirButton: {
    marginTop: theme.spacing.xl,
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gerenciarLink: {
    marginTop: theme.spacing.md,
    textDecorationLine: 'underline',
  },
});
