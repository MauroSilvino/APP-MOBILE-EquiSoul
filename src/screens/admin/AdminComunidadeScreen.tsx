import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Chip } from '../../components/ui/Chip';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminComunidade'>;

const TIPOS = ['Posts', 'Stories', 'Reels', 'Comentários'] as const;

export function AdminComunidadeScreen({ navigation }: Props) {
  const comunidadeItens = useAdminStore((s) => s.comunidadeItens);
  const resolverComunidadeItem = useAdminStore((s) => s.resolverComunidadeItem);
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Posts');
  const [pending, setPending] = useState<{ index: number; acao: string } | null>(null);

  return (
    <AdminScreen
      title="Comunidade"
      activeRoute="AdminComunidade"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.chipsRow}>
        {TIPOS.map((t) => (
          <Chip key={t} label={t} selected={tipo === t} onPress={() => setTipo(t)} />
        ))}
      </View>

      <View style={styles.list}>
        {comunidadeItens.map((item, index) => (
          <View key={item.autor} style={[styles.card, item.resolvido && styles.cardResolvido]}>
            <View style={styles.cardHeader}>
              <Text variant="sm" weight="bold">
                {item.autor}
              </Text>
              <Text variant="xs" weight="bold" color={theme.colors.error}>
                {item.denuncias} denúncias
              </Text>
            </View>
            <Text variant="sm" weight="medium" color="secondary" style={styles.resumo}>
              {item.resumo}
            </Text>
            {item.resolvido ? (
              <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.resolvido}>
                Ação aplicada ✓
              </Text>
            ) : (
              <View style={styles.acoesRow}>
                {item.acoes.map((acao) => (
                  <Pressable key={acao} style={styles.acaoChip} onPress={() => setPending({ index, acao })}>
                    <Text variant="xs" weight="bold">
                      {acao}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      {pending && (
        <ConfirmModal
          visible
          title={`${pending.acao} conteúdo?`}
          description={`Confirma "${pending.acao}" para: ${comunidadeItens[pending.index]?.resumo ?? ''}`}
          confirmLabel={pending.acao}
          onConfirm={() => {
            resolverComunidadeItem(pending.index, pending.acao);
            setPending(null);
          }}
          onCancel={() => setPending(null)}
        />
      )}
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  cardResolvido: {
    opacity: 0.55,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resumo: {
    marginTop: 4,
  },
  resolvido: {
    marginTop: 8,
  },
  acoesRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  acaoChip: {
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
