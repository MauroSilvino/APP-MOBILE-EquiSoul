import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Configurar2FA'>;

export function Configurar2FAScreen({ navigation }: Props) {
  const setDoisFatores = useSettingsStore((state) => state.setDoisFatores);
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [telefone, setTelefone] = useState('');
  const [codigo, setCodigo] = useState('');

  function handleCancelar() {
    navigation.navigate('Seguranca');
  }

  function handleConfirmar() {
    setDoisFatores(true);
    navigation.navigate('Seguranca');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SettingsHeader title="Autenticação em dois fatores" breadcrumb="Segurança" onBack={handleCancelar} />

        {etapa === 1 ? (
          <>
            <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
              Informe seu número para receber um código de verificação por SMS.
            </Text>
            <View style={styles.field}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
                TELEFONE
              </Text>
              <TextField
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
                placeholder="+55 11 90000-0000"
              />
            </View>
            <Pressable style={styles.primaryButton} onPress={() => setEtapa(2)}>
              <Text variant="sm" weight="extraBold">
                Enviar código
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
              Enviamos um código de 4 dígitos para {telefone}.
            </Text>
            <View style={styles.field}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
                CÓDIGO DE VERIFICAÇÃO
              </Text>
              <TextField
                value={codigo}
                onChangeText={setCodigo}
                keyboardType="number-pad"
                placeholder="0000"
                maxLength={4}
              />
            </View>
            <Pressable style={styles.primaryButton} onPress={handleConfirmar}>
              <Text variant="sm" weight="extraBold">
                Confirmar e ativar
              </Text>
            </Pressable>
          </>
        )}

        <Pressable style={styles.cancelButton} onPress={handleCancelar}>
          <Text variant="sm" weight="bold">
            Cancelar
          </Text>
        </Pressable>
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  field: {
    marginTop: theme.spacing.lg,
  },
  fieldLabel: {
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  primaryButton: {
    marginTop: theme.spacing.xl,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    marginTop: theme.spacing.sm,
    height: 46,
    borderRadius: 23,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
