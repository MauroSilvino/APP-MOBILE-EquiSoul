import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'TrocarSenha'>;

export function TrocarSenhaScreen({ navigation }: Props) {
  const [atual, setAtual] = useState('');
  const [nova, setNova] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [erro, setErro] = useState('');

  function handleSalvar() {
    if (!nova || nova.length < 6) {
      setErro('A nova senha deve ter ao menos 6 caracteres.');
      return;
    }
    if (nova !== confirmar) {
      setErro('As senhas não coincidem.');
      return;
    }
    setErro('');
    navigation.navigate('Conta');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SettingsHeader title="Trocar senha" breadcrumb="Conta" onBack={() => navigation.navigate('Conta')} />

        <View style={styles.fields}>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              SENHA ATUAL
            </Text>
            <TextField value={atual} onChangeText={setAtual} secureTextEntry />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              NOVA SENHA
            </Text>
            <TextField value={nova} onChangeText={setNova} secureTextEntry />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              CONFIRMAR NOVA SENHA
            </Text>
            <TextField value={confirmar} onChangeText={setConfirmar} secureTextEntry />
          </View>
          {!!erro && (
            <Text variant="sm" weight="semiBold" color={theme.colors.error}>
              {erro}
            </Text>
          )}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.saveButton} onPress={handleSalvar}>
            <Text variant="sm" weight="extraBold">
              Salvar nova senha
            </Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('Conta')}>
            <Text variant="sm" weight="bold">
              Cancelar
            </Text>
          </Pressable>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  fields: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  fieldLabel: {
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  actions: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  saveButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
