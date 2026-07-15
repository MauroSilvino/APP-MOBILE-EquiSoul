import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumErroPagamento'>;

export function PremiumErroPagamentoScreen({ navigation, route }: Props) {
  const checkout = route.params;

  return (
    <Screen style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CloseIcon size={26} color={theme.colors.error} strokeWidth={2.4} />
        </View>
        <Text variant="xl" weight="extraBold" style={styles.titulo}>
          Não foi possível concluir o pagamento
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitulo}>
          Verifique os dados do seu método de pagamento e tente novamente.
        </Text>

        <Pressable
          style={styles.tentarButton}
          onPress={() => navigation.navigate('PremiumCheckout', checkout)}
        >
          <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
            Tentar novamente
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('PremiumCheckout', { ...checkout })}
        >
          <Text variant="xs" weight="bold" color={theme.colors.accent.olive} style={styles.outroMetodoLink}>
            Usar outro método de pagamento
          </Text>
        </Pressable>
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
    backgroundColor: 'rgba(184,92,76,0.14)',
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
    lineHeight: 20,
  },
  tentarButton: {
    marginTop: theme.spacing.xl,
    width: '100%',
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outroMetodoLink: {
    marginTop: theme.spacing.md,
    textDecorationLine: 'underline',
  },
});
