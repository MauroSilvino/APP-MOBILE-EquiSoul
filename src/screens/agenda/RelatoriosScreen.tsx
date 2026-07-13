import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, DocumentIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Relatorios'>;

const RESUMOS = ['Resumo semanal', 'Resumo mensal', 'Resumo anual', 'Maiores conquistas', 'Evolução', 'Momentos marcantes', 'Padrões e sugestões'];
const EXPORTS = ['PDF', 'CSV', 'Livro Digital', 'Retrospectiva', 'Timeline', 'Estatísticas'];

export function RelatoriosScreen({ navigation }: Props) {
  const [resumo, setResumo] = useState<string | null>(null);
  const [exportFormato, setExportFormato] = useState<string | null>(null);
  const [status, setStatus] = useState('');

  function handleGerar() {
    if (!resumo || !exportFormato) {
      setStatus('Escolha um tipo de resumo e um formato de exportação primeiro.');
      return;
    }
    setStatus(`Gerando "${resumo}" em ${exportFormato}...`);
  }

  const podeGerar = !!resumo && !!exportFormato;

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Relatórios
          </Text>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          A IA PODE GERAR
        </Text>
        <View style={styles.resumosList}>
          {RESUMOS.map((label) => {
            const selected = resumo === label;
            return (
              <Pressable
                key={label}
                style={[styles.resumoRow, selected && styles.resumoRowSelected]}
                onPress={() => {
                  setResumo(label);
                  setStatus('');
                }}
              >
                <DocumentIcon />
                <Text variant="md" weight="bold">
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          EXPORTAR COMO
        </Text>
        <View style={styles.exportRow}>
          {EXPORTS.map((label) => {
            const selected = exportFormato === label;
            return (
              <Pressable
                key={label}
                style={[styles.exportChip, selected && styles.exportChipSelected]}
                onPress={() => {
                  setExportFormato(label);
                  setStatus('');
                }}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={[styles.gerarButton, podeGerar && styles.gerarButtonAtivo]}
          onPress={handleGerar}
        >
          <Text variant="sm" weight="extraBold">
            Gerar relatório
          </Text>
        </Pressable>
        {!!status && (
          <Text variant="sm" weight="semiBold" color={theme.colors.accent.moss} style={styles.status}>
            {status}
          </Text>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  resumosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  resumoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: 'transparent',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  resumoRowSelected: {
    backgroundColor: 'rgba(201,161,90,0.14)',
    borderColor: theme.colors.accent.gold,
  },
  exportRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  exportChip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  exportChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  gerarButton: {
    marginTop: theme.spacing.xl,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(43,41,36,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gerarButtonAtivo: {
    backgroundColor: theme.colors.accent.gold,
  },
  status: {
    marginTop: theme.spacing.md,
  },
});
