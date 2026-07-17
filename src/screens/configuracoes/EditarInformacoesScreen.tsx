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
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EditarInformacoes'>;

export function EditarInformacoesScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const setProfile = useUserStore((state) => state.setProfile);
  const contaContato = useSettingsStore((state) => state.contaContato);
  const setContaContato = useSettingsStore((state) => state.setContaContato);

  const [nome, setNome] = useState(profile.nome);
  const [email, setEmail] = useState(contaContato.email);
  const [telefone, setTelefone] = useState(contaContato.telefone);
  const [cidade, setCidade] = useState(profile.cidade);
  const [pais, setPais] = useState(profile.pais);

  function handleSalvar() {
    setProfile({ nome, cidade, pais });
    setContaContato({ email, telefone });
    navigation.navigate('Conta');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SettingsHeader title="Editar" breadcrumb="Conta" onBack={() => navigation.navigate('Conta')} />

        <View style={styles.fields}>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              NOME
            </Text>
            <TextField value={nome} onChangeText={setNome} />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              EMAIL
            </Text>
            <TextField value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              TELEFONE
            </Text>
            <TextField value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              CIDADE
            </Text>
            <TextField value={cidade} onChangeText={setCidade} />
          </View>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
              PAÍS
            </Text>
            <TextField value={pais} onChangeText={setPais} />
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.saveButton} onPress={handleSalvar}>
            <Text variant="sm" weight="extraBold">
              Salvar alterações
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
