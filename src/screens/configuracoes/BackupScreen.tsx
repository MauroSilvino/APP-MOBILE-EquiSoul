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
import { useMemoriesStore } from '../../store/useMemoriesStore';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Backup'>;

const EXPORT_OPTIONS = ['PDF', 'CSV', 'ZIP', 'Livro Digital', 'Álbum', 'Timeline'];

export function BackupScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const ultimoBackupData = useSettingsStore((state) => state.ultimoBackupData);
  const fazerBackup = useSettingsStore((state) => state.fazerBackup);
  const [restaurarConfirmOpen, setRestaurarConfirmOpen] = useState(false);
  const { message, show } = useToast();

  const totalMidia = memorias.reduce((sum, m) => sum + m.midiaCount, 0);
  const espacoMB = totalMidia * 12;
  const espacoLabel = espacoMB < 1024 ? `${espacoMB} MB de 15 GB` : `${(espacoMB / 1024).toFixed(1)} GB de 15 GB`;

  const backupItens = [
    { label: 'Espaço utilizado', valor: espacoLabel },
    { label: 'Memórias', valor: String(memorias.length) },
    { label: 'Itens de mídia', valor: String(totalMidia) },
  ];

  function handleRestaurarConfirm() {
    setRestaurarConfirmOpen(false);
    show('Backup restaurado com sucesso');
  }

  function handleExportar(label: string) {
    show(`Preparando exportação em ${label}…`);
    setTimeout(() => show(`Exportação em ${label} concluída`), 1100);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Backup e exportação" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.card}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.cardLabel}>
            ÚLTIMA SINCRONIZAÇÃO
          </Text>
          <Text variant="lg" weight="extraBold" style={styles.cardValue}>
            {ultimoBackupData ?? 'Nenhum backup realizado ainda'}
          </Text>
          <View style={styles.itensList}>
            {backupItens.map((b) => (
              <View key={b.label} style={styles.itemRow}>
                <Text variant="sm" weight="semiBold">
                  {b.label}
                </Text>
                <Text variant="sm" weight="semiBold" color="secondary">
                  {b.valor}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Pressable style={styles.backupButton} onPress={fazerBackup}>
          <Text variant="sm" weight="extraBold">
            {ultimoBackupData ? 'Backup concluído ✓' : 'Fazer backup agora'}
          </Text>
        </Pressable>
        <Pressable style={styles.restaurarButton} onPress={() => setRestaurarConfirmOpen(true)}>
          <Text variant="sm" weight="bold">
            Restaurar backup
          </Text>
        </Pressable>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          EXPORTAR COMO
        </Text>
        <View style={styles.exportRow}>
          {EXPORT_OPTIONS.map((label) => (
            <Pressable key={label} style={styles.exportChip} onPress={() => handleExportar(label)}>
              <Text variant="sm" weight="bold">
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ConfirmModal
        visible={restaurarConfirmOpen}
        title="Restaurar backup?"
        description="Isso substituirá os dados atuais pelo backup mais recente. Alterações recentes não salvas serão perdidas."
        confirmLabel="Restaurar"
        danger
        onConfirm={handleRestaurarConfirm}
        onCancel={() => setRestaurarConfirmOpen(false)}
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
  card: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardLabel: {
    letterSpacing: 0.4,
  },
  cardValue: {
    marginTop: 4,
  },
  itensList: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backupButton: {
    marginTop: theme.spacing.md,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restaurarButton: {
    marginTop: theme.spacing.sm,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    letterSpacing: 0.4,
  },
  exportRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  exportChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
});
