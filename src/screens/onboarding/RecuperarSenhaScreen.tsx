import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'RecuperarSenha'>;

export function RecuperarSenhaScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  return (
    <Screen style={styles.screen}>
      <Text variant="xl" weight="extraBold">
        Recuperar senha
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        Enviaremos um link de redefinição para o seu email.
      </Text>

      <View style={styles.field}>
        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <Button variant="primary" onPress={() => setEnviado(true)} style={styles.submit}>
        Enviar link
      </Button>

      {enviado && (
        <>
          <View style={styles.successBanner}>
            <Text variant="sm" weight="semiBold" color={theme.colors.accent.moss}>
              Enviamos um link de recuperação. Verifique sua caixa de entrada.
            </Text>
          </View>
          <Text
            variant="sm"
            weight="bold"
            color={theme.colors.accent.leather}
            style={styles.center}
            onPress={() => navigation.navigate('NovaSenha')}
          >
            Já abri o link, definir nova senha
          </Text>
        </>
      )}

      <View style={styles.spacer} />

      <Text
        variant="sm"
        weight="bold"
        color={theme.colors.accent.leather}
        style={styles.center}
        onPress={() => navigation.navigate('Login')}
      >
        Voltar para login
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
  field: {
    marginTop: theme.spacing.xl,
  },
  submit: {
    marginTop: theme.spacing.lg,
  },
  successBanner: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.12)',
  },
  center: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  spacer: {
    flex: 1,
  },
});
