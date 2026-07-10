import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'NovaSenha'>;

export function NovaSenhaScreen({ navigation }: Props) {
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const valido = senha.length >= 6 && confirmar === senha;
  const erro = submitAttempted && !valido;

  function tentarNovaSenha() {
    setSubmitAttempted(true);
    if (!valido) return;
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <Screen style={styles.screen}>
      <Text variant="xl" weight="extraBold">
        Nova senha
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        Crie uma senha nova para sua conta.
      </Text>

      <View style={styles.fields}>
        <TextField placeholder="Nova senha" value={senha} onChangeText={setSenha} secureTextEntry />
        <TextField
          placeholder="Confirmar nova senha"
          value={confirmar}
          onChangeText={setConfirmar}
          secureTextEntry
          error={erro ? 'As senhas precisam ter 6+ caracteres e coincidir' : undefined}
        />
      </View>

      <View style={styles.spacer} />

      <Button variant="primary" onPress={tentarNovaSenha}>
        Redefinir senha
      </Button>
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
  fields: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  spacer: {
    flex: 1,
  },
});
