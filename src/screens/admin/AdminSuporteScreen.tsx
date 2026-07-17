import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AdminChamado, useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminSuporte'>;

const PRIORIDADE_COLORS: Record<AdminChamado['prioridade'], { bg: string; color: string }> = {
  Alta: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  Média: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  Baixa: { bg: 'rgba(79,93,69,0.15)', color: theme.colors.accent.moss },
};

export function AdminSuporteScreen({ navigation }: Props) {
  const suporteCategorias = useAdminStore((s) => s.suporteCategorias);
  const chamados = useAdminStore((s) => s.chamados);
  const [categoria, setCategoria] = useState(suporteCategorias[0]);

  return (
    <AdminScreen
      title="Suporte"
      activeRoute="AdminSuporte"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.chipsRow}>
        {suporteCategorias.map((c) => (
          <Chip key={c} label={c} selected={categoria === c} onPress={() => setCategoria(c)} />
        ))}
      </View>

      <View style={styles.list}>
        {chamados.map((c) => {
          const colors = PRIORIDADE_COLORS[c.prioridade];
          return (
            <Pressable key={c.id} style={styles.card} onPress={() => navigation.navigate('AdminChamadoDetalhe', { id: c.id })}>
              <View style={styles.cardHeader}>
                <Text variant="sm" weight="bold" style={styles.assunto}>
                  {c.assunto}
                </Text>
                <View style={[styles.badge, { backgroundColor: colors.bg }]}>
                  <Text variant="xs" weight="bold" color={colors.color}>
                    {c.prioridade}
                  </Text>
                </View>
              </View>
              <Text variant="xs" weight="medium" color="secondary" style={styles.meta}>
                {c.categoria} · SLA {c.sla} · {c.status}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  assunto: {
    flex: 1,
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  meta: {
    marginTop: 3,
  },
});
