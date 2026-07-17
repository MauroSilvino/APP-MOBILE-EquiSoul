import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminLogs'>;

const PAGE_SIZE = 10;

export function AdminLogsScreen({ navigation }: Props) {
  const logs = useAdminStore((s) => s.logs);
  const [query, setQuery] = useState('');
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return logs.filter((l) => !q || l.fonte.toLowerCase().includes(q) || l.mensagem.toLowerCase().includes(q));
  }, [logs, query]);

  const visivelList = filtrados.slice(0, visiveis);
  const temMais = filtrados.length > visiveis;
  const vazio = filtrados.length === 0;

  return (
    <AdminScreen
      title="Logs"
      activeRoute="AdminLogs"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <TextField value={query} onChangeText={setQuery} placeholder="Pesquisa avançada" style={styles.search} />

      <View style={styles.list}>
        {visivelList.map((l, i) => (
          <View key={`${l.fonte}-${i}`} style={styles.row}>
            <View style={styles.fonteBadge}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                {l.fonte}
              </Text>
            </View>
            <Text variant="xs" weight="semiBold" style={styles.mensagem} numberOfLines={1}>
              {l.mensagem}
            </Text>
          </View>
        ))}
        {vazio && (
          <Text variant="sm" weight="semiBold" color="tertiary" style={styles.emptyText}>
            Nenhum log encontrado.
          </Text>
        )}
        {temMais && (
          <Pressable style={styles.loadMore} onPress={() => setVisiveis((v) => v + PAGE_SIZE)}>
            <Text variant="sm" weight="bold">
              Carregar mais
            </Text>
          </Pressable>
        )}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: theme.spacing.md,
    height: 44,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  fonteBadge: {
    borderRadius: 6,
    backgroundColor: 'rgba(43,41,36,0.08)',
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  mensagem: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
  },
  loadMore: {
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
