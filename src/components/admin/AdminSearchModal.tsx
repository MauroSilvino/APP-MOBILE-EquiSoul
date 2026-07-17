import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../ui/Text';
import { SearchIcon } from '../ui/icons';
import { useAdminStore } from '../../store/useAdminStore';
import { ADMIN_MODULES, AdminModuleRoute } from './adminModules';

interface AdminSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigateModule: (route: AdminModuleRoute) => void;
  onNavigateUsuario: (id: number) => void;
  onNavigateCavalo: (id: number) => void;
  onNavigateChamado: (id: number) => void;
}

interface SearchResult {
  label: string;
  tipo: string;
  onPress: () => void;
}

export function AdminSearchModal({
  visible,
  onClose,
  onNavigateModule,
  onNavigateUsuario,
  onNavigateCavalo,
  onNavigateChamado,
}: AdminSearchModalProps) {
  const [query, setQuery] = useState('');
  const usuarios = useAdminStore((s) => s.usuarios);
  const cavalos = useAdminStore((s) => s.cavalos);
  const chamados = useAdminStore((s) => s.chamados);

  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const index: SearchResult[] = [
      ...usuarios.map((u) => ({ label: u.nome, tipo: 'Usuário', onPress: () => onNavigateUsuario(u.id) })),
      ...cavalos.map((c) => ({ label: c.nome, tipo: 'Cavalo', onPress: () => onNavigateCavalo(c.id) })),
      ...chamados.map((c) => ({ label: c.assunto, tipo: 'Chamado', onPress: () => onNavigateChamado(c.id) })),
      ...ADMIN_MODULES.map((m) => ({ label: m.label, tipo: 'Módulo', onPress: () => onNavigateModule(m.route) })),
    ];
    return index.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, usuarios, cavalos, chamados, onNavigateUsuario, onNavigateCavalo, onNavigateChamado, onNavigateModule]);

  function handleClose() {
    setQuery('');
    onClose();
  }

  function handleResult(result: SearchResult) {
    setQuery('');
    onClose();
    result.onPress();
  }

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.inputWrap}>
            <SearchIcon size={14} color={theme.colors.text.secondary} />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar usuários, cavalos, chamados, módulos…"
              style={styles.input}
              placeholderTextColor={theme.colors.text.tertiary}
            />
          </View>
          <Pressable onPress={handleClose}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              Fechar
            </Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.results}>
          {results.map((r, i) => (
            <Pressable key={`${r.tipo}-${r.label}-${i}`} style={styles.resultRow} onPress={() => handleResult(r)}>
              <Text variant="sm" weight="bold" style={styles.resultLabel}>
                {r.label}
              </Text>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.resultTipo}>
                {r.tipo}
              </Text>
            </Pressable>
          ))}
          {!!query.trim() && results.length === 0 && (
            <Text variant="sm" weight="medium" color="tertiary" style={styles.noResults}>
              Nenhum resultado para "{query}"
            </Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    paddingTop: 56,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.text.primary,
  },
  results: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  resultLabel: {
    flex: 1,
  },
  resultTipo: {
    textTransform: 'uppercase',
  },
  noResults: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
});
