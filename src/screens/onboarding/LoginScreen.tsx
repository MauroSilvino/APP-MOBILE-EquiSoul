import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { AuthProvider, useAuthStore } from '../../store/useAuthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

function GoogleIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={theme.colors.text.primary} strokeWidth={1.8}>
      <Circle cx="12" cy="12" r="9" />
      <Path d="M3 12h18M12 3a13 13 0 010 18 13 13 0 010-18z" />
    </Svg>
  );
}

function AppleIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={theme.colors.text.inverse} strokeWidth={1.8}>
      <Path d="M12 4a4 4 0 014 4c0 3-2 4-2 4" />
      <Path d="M6 12c0 5 3 8 6 8s6-3 6-8" />
    </Svg>
  );
}

function EmailIcon() {
  return (
    <Svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke={theme.colors.text.primary} strokeWidth={1.8}>
      <Path d="M4 6h16v12H4z" />
      <Path d="M4 7l8 6 8-6" />
    </Svg>
  );
}

export function LoginScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);

  function toDashboard(provider: AuthProvider) {
    login(provider);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return (
    <Screen style={styles.screen}>
      <Text variant="xxl" weight="extraBold">
        Bem-vindo(a) de volta
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        Entre para continuar sua história com seu cavalo.
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.outlineButton} onPress={() => toDashboard('google')}>
          <GoogleIcon />
          <Text variant="md" weight="bold">
            Continuar com Google
          </Text>
        </Pressable>

        <Pressable style={styles.darkButton} onPress={() => toDashboard('apple')}>
          <AppleIcon />
          <Text variant="md" weight="bold" color="inverse">
            Continuar com Apple
          </Text>
        </Pressable>

        <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('Cadastro')}>
          <EmailIcon />
          <Text variant="md" weight="bold">
            Continuar com Email
          </Text>
        </Pressable>
      </View>

      <Text variant="xs" weight="medium" color="tertiary" style={styles.disclaimer}>
        Google e Apple reconhecem sua conta e vão direto ao seu diário. Email é para quem está
        criando uma conta nova.
      </Text>

      <Text
        variant="sm"
        weight="bold"
        color={theme.colors.accent.leather}
        style={styles.forgot}
        onPress={() => navigation.navigate('RecuperarSenha')}
      >
        Esqueceu a senha?
      </Text>

      <View style={styles.spacer} />

      <Text
        variant="sm"
        weight="bold"
        color="secondary"
        style={styles.guest}
        onPress={() => toDashboard('guest')}
      >
        Entrar como visitante
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  actions: {
    marginTop: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  outlineButton: {
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  darkButton: {
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.surfaceDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  disclaimer: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  forgot: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
  guest: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
