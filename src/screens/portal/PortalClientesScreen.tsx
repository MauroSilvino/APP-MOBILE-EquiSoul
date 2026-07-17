import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalClientes'>;

const PAGE_SIZE = 4;

export function PortalClientesScreen({ navigation }: Props) {
  const clientes = usePortalStore((s) => s.clientes);
  const [query, setQuery] = useState('');
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return clientes.filter((c) => !q || c.nome.toLowerCase().includes(q) || c.cidade.toLowerCase().includes(q));
  }, [clientes, query]);

  const visivelList = filtrados.slice(0, visiveis);
  const temMais = filtrados.length > visiveis;
  const vazio = filtrados.length === 0;

  return (
    <PortalScreen
      title="Clientes"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <TextField value={query} onChangeText={setQuery} placeholder="Buscar cliente" style={styles.search} />

      <View style={styles.list}>
        {visivelList.map((c) => (
          <Pressable key={c.id} style={styles.row} onPress={() => navigation.navigate('PortalClienteDetalhe', { id: c.id })}>
            <ImagePlaceholder caption="" style={styles.avatar} />
            <View style={styles.rowTexts}>
              <Text variant="sm" weight="bold">
                {c.nome}
              </Text>
              <Text variant="xs" weight="medium" color="secondary">
                {c.cidade} · {c.cavalos} cavalo(s) · último em {c.ultimo}
              </Text>
            </View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              ★ {c.avaliacao}
            </Text>
          </Pressable>
        ))}
        {vazio && (
          <Text variant="sm" weight="semiBold" color="tertiary" style={styles.emptyText}>
            Nenhum cliente encontrado.
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
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: theme.spacing.md,
    height: 44,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  rowTexts: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
  },
  loadMore: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
