import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAuthStore } from '../../store/useAuthStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Conta'>;

export function ContaScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const contaContato = useSettingsStore((state) => state.contaContato);
  const idiomaSelecionado = useSettingsStore((state) => state.idiomaSelecionado);
  const logout = useAuthStore((state) => state.logout);
  const [excluirConfirmOpen, setExcluirConfirmOpen] = useState(false);
  const { message, show } = useToast();

  const campos = [
    { label: 'Nome', valor: profile.nome || 'Não informado' },
    { label: 'Email', valor: contaContato.email || 'Não informado' },
    { label: 'Telefone', valor: contaContato.telefone || 'Não informado' },
    { label: 'Cidade', valor: profile.cidade || 'Não informada' },
    { label: 'País', valor: profile.pais || 'Não informado' },
    { label: 'Idioma', valor: idiomaSelecionado },
    { label: 'Fuso horário', valor: 'GMT-3 · Brasília' },
  ];

  function handleExcluirConfirm() {
    setExcluirConfirmOpen(false);
    logout();
    show('Conta marcada para exclusão');
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Conta" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.avatarRow}>
          <ImagePlaceholder caption="foto" style={styles.avatar} />
        </View>

        <View style={styles.fieldsList}>
          {campos.map((c) => (
            <View key={c.label} style={styles.fieldCard}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.fieldLabel}>
                {c.label.toUpperCase()}
              </Text>
              <Text variant="sm" weight="extraBold" style={styles.fieldValue}>
                {c.valor}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.editButton} onPress={() => navigation.navigate('EditarInformacoes')}>
            <Text variant="sm" weight="extraBold">
              Editar informações
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('TrocarSenha')}>
            <Text variant="sm" weight="bold">
              Trocar senha
            </Text>
          </Pressable>
          <Pressable style={styles.dangerButton} onPress={() => setExcluirConfirmOpen(true)}>
            <Text variant="sm" weight="extraBold" color={theme.colors.error}>
              Excluir conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={excluirConfirmOpen}
        title="Excluir sua conta?"
        description="Essa ação é permanente. Memórias, fotos e dados do seu cavalo serão apagados e não podem ser recuperados."
        confirmLabel="Excluir definitivamente"
        danger
        onConfirm={handleExcluirConfirm}
        onCancel={() => setExcluirConfirmOpen(false)}
      />
      <Toast message={message} />
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
  avatarRow: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  fieldsList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  fieldCard: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  fieldLabel: {
    letterSpacing: 0.4,
  },
  fieldValue: {
    marginTop: 4,
  },
  actions: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  editButton: {
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dangerButton: {
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(184,92,76,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
