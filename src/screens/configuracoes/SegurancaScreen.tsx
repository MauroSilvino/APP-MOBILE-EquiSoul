import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { SettingsToggleRow } from '../../components/configuracoes/SettingsToggleRow';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { LaptopIcon, PhoneIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Seguranca'>;

export function SegurancaScreen({ navigation }: Props) {
  const seguranca = useSettingsStore((state) => state.seguranca);
  const toggleBiometria = useSettingsStore((state) => state.toggleBiometria);
  const setDoisFatores = useSettingsStore((state) => state.setDoisFatores);
  const sessoes = useSettingsStore((state) => state.sessoes);
  const encerrarSessao = useSettingsStore((state) => state.encerrarSessao);

  const [desativar2faConfirmOpen, setDesativar2faConfirmOpen] = useState(false);
  const [sessaoParaEncerrar, setSessaoParaEncerrar] = useState<string | null>(null);
  const { message, show } = useToast();

  function handleToggleDoisFatores() {
    if (seguranca.doisFatores) {
      setDesativar2faConfirmOpen(true);
    } else {
      navigation.navigate('Configurar2FA');
    }
  }

  function handleEncerrarConfirm() {
    if (!sessaoParaEncerrar) return;
    encerrarSessao(sessaoParaEncerrar);
    setSessaoParaEncerrar(null);
    show('Sessão encerrada');
  }

  const sessaoAlvo = sessoes.find((s) => s.id === sessaoParaEncerrar);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Segurança" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.list}>
          <SettingsToggleRow label="Face ID / Biometria" value={seguranca.biometria} onValueChange={toggleBiometria} />
          <SettingsToggleRow
            label="Autenticação em dois fatores"
            value={seguranca.doisFatores}
            onValueChange={handleToggleDoisFatores}
          />
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          SESSÕES ATIVAS
        </Text>
        <View style={styles.sessoesList}>
          {sessoes.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text variant="sm" weight="semiBold" color="secondary">
                Nenhuma sessão ativa além deste dispositivo.
              </Text>
            </View>
          ) : (
            sessoes.map((s) => (
              <View key={s.id} style={styles.sessaoCard}>
                {s.tipo === 'laptop' ? (
                  <LaptopIcon size={18} color={theme.colors.accent.leather} />
                ) : (
                  <PhoneIcon size={18} color={theme.colors.accent.leather} />
                )}
                <View style={styles.sessaoTexts}>
                  <Text variant="xs" weight="bold">
                    {s.dispositivo}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary">
                    {s.local} · {s.acesso}
                  </Text>
                </View>
                <Pressable onPress={() => setSessaoParaEncerrar(s.id)}>
                  <Text variant="xs" weight="bold" color={theme.colors.error}>
                    Encerrar
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={desativar2faConfirmOpen}
        title="Desativar dois fatores?"
        description="Sua conta ficará protegida apenas por senha."
        confirmLabel="Desativar"
        danger
        onConfirm={() => {
          setDoisFatores(false);
          setDesativar2faConfirmOpen(false);
        }}
        onCancel={() => setDesativar2faConfirmOpen(false)}
      />
      <ConfirmModal
        visible={!!sessaoAlvo}
        title="Encerrar sessão?"
        description={`Isso desconectará ${sessaoAlvo?.dispositivo ?? ''} imediatamente.`}
        confirmLabel="Encerrar"
        danger
        onConfirm={handleEncerrarConfirm}
        onCancel={() => setSessaoParaEncerrar(null)}
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
  list: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    letterSpacing: 0.4,
  },
  sessoesList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  emptyCard: {
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  sessaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  sessaoTexts: {
    flex: 1,
  },
});
