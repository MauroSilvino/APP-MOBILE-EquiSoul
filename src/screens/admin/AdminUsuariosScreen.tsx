import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AdminUsuario, useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminUsuarios'>;

const FILTROS = ['Todos', 'Premium', 'Banido', 'Verificado', 'Novo', 'Inativo'] as const;

const STATUS_COLORS: Record<AdminUsuario['status'], { bg: string; color: string }> = {
  Verificado: { bg: 'rgba(79,93,69,0.15)', color: theme.colors.accent.moss },
  Novo: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  Ativo: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.primary },
  Inativo: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.tertiary },
  Banido: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
};

const PAGE_SIZE = 6;

export function AdminUsuariosScreen({ navigation }: Props) {
  const usuarios = useAdminStore((s) => s.usuarios);
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('Todos');
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    return usuarios.filter((u) => {
      const matchQuery = !q || u.nome.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.cidade.toLowerCase().includes(q);
      const matchFiltro = filtro === 'Todos' || u.status === filtro || (filtro === 'Premium' && u.plano === 'Premium');
      return matchQuery && matchFiltro;
    });
  }, [usuarios, query, filtro]);

  const visivelList = filtrados.slice(0, visiveis);
  const temMais = filtrados.length > visiveis;
  const vazio = filtrados.length === 0;

  return (
    <AdminScreen
      title="Usuários"
      activeRoute="AdminUsuarios"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <TextField
        value={query}
        onChangeText={setQuery}
        placeholder="Nome, email, ID ou cidade"
        style={styles.search}
      />
      <View style={styles.chipsRow}>
        {FILTROS.map((f) => (
          <Chip key={f} label={f} selected={filtro === f} onPress={() => setFiltro(f)} />
        ))}
      </View>

      <View style={styles.list}>
        {visivelList.map((u) => {
          const colors = STATUS_COLORS[u.status];
          return (
            <Pressable
              key={u.id}
              style={styles.row}
              onPress={() => navigation.navigate('AdminUsuarioDetalhe', { id: u.id })}
            >
              <ImagePlaceholder caption="" style={styles.avatar} />
              <View style={styles.rowTexts}>
                <Text variant="sm" weight="bold">
                  {u.nome}
                </Text>
                <Text variant="xs" weight="medium" color="secondary">
                  {u.cidade} · {u.plano}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                <Text variant="xs" weight="bold" color={colors.color}>
                  {u.status}
                </Text>
              </View>
            </Pressable>
          );
        })}
        {vazio && (
          <Text variant="sm" weight="semiBold" color="tertiary" style={styles.emptyText}>
            Nenhum usuário encontrado.
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
  chipsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  rowTexts: {
    flex: 1,
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
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
