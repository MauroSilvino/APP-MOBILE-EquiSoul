import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Compartilhamento'>;

const COMPARTILHAR_OPTIONS = ['Perfil', 'Cavalo', 'Evento', 'Álbum', 'Carta', 'Timeline'];

export function CompartilhamentoScreen({ navigation }: Props) {
  const linksAtivos = useSettingsStore((state) => state.linksAtivos);
  const revogarLink = useSettingsStore((state) => state.revogarLink);
  const [linkParaRevogar, setLinkParaRevogar] = useState<string | null>(null);
  const { message, show } = useToast();

  function handleCompartilhar(tipo: string) {
    show(`Compartilhando ${tipo}…`);
  }

  function handleRevogarConfirm() {
    if (!linkParaRevogar) return;
    revogarLink(linkParaRevogar);
    setLinkParaRevogar(null);
    show('Link revogado');
  }

  const linkAlvo = linksAtivos.find((l) => l.id === linkParaRevogar);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Compartilhamento" onBack={() => navigation.navigate('Configuracoes')} />

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          COMPARTILHAR
        </Text>
        <View style={styles.compartilharRow}>
          {COMPARTILHAR_OPTIONS.map((label) => (
            <Pressable key={label} style={styles.compartilharChip} onPress={() => handleCompartilhar(label)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          LINKS E PERMISSÕES ATIVAS
        </Text>
        <View style={styles.linksList}>
          {linksAtivos.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text variant="sm" weight="semiBold" color="secondary">
                Nenhum link compartilhado no momento.
              </Text>
            </View>
          ) : (
            linksAtivos.map((l) => (
              <View key={l.id} style={styles.linkCard}>
                <View style={styles.linkTexts}>
                  <Text variant="xs" weight="bold">
                    {l.nome}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary">
                    {l.permissao}
                  </Text>
                </View>
                <Pressable onPress={() => setLinkParaRevogar(l.id)}>
                  <Text variant="xs" weight="bold" color={theme.colors.error}>
                    Revogar
                  </Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={!!linkAlvo}
        title="Revogar acesso?"
        description={`Quem tiver o link de "${linkAlvo?.nome ?? ''}" perderá o acesso imediatamente.`}
        confirmLabel="Revogar"
        danger
        onConfirm={handleRevogarConfirm}
        onCancel={() => setLinkParaRevogar(null)}
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
  sectionTitle: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  compartilharRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  compartilharChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
  linksList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  emptyCard: {
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  linkCard: {
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
  linkTexts: {
    flex: 1,
  },
});
