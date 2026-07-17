import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Chip } from '../../components/ui/Chip';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { AdminMarketplaceItem, useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminMarketplace'>;

const TIPOS = ['Produtos', 'Serviços', 'Profissionais', 'Reservas', 'Pedidos'] as const;

const STATUS_COLORS: Record<AdminMarketplaceItem['status'], { bg: string; color: string }> = {
  Aprovado: { bg: 'rgba(79,93,69,0.15)', color: theme.colors.accent.moss },
  Pendente: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  Verificado: { bg: 'rgba(79,93,69,0.15)', color: theme.colors.accent.moss },
  Reembolso: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  Rejeitado: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  Reembolsado: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.secondary },
};

type PendingAction = { id: number; nome: string; kind: 'aprovar' | 'rejeitar' | 'reembolsar'; valor: string };

export function AdminMarketplaceScreen({ navigation }: Props) {
  const marketplaceItens = useAdminStore((s) => s.marketplaceItens);
  const setMarketplaceStatus = useAdminStore((s) => s.setMarketplaceStatus);
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Produtos');
  const [pending, setPending] = useState<PendingAction | null>(null);

  function handleConfirm() {
    if (!pending) return;
    const status = pending.kind === 'aprovar' ? 'Aprovado' : pending.kind === 'rejeitar' ? 'Rejeitado' : 'Reembolsado';
    setMarketplaceStatus(pending.id, status);
    setPending(null);
  }

  const confirmCopy: Record<PendingAction['kind'], { title: string; description: string; confirmLabel: string }> = pending
    ? {
        aprovar: { title: 'Aprovar item?', description: `Aprovar "${pending.nome}" para publicação.`, confirmLabel: 'Aprovar' },
        rejeitar: { title: 'Rejeitar item?', description: `Rejeitar "${pending.nome}"? O anunciante será notificado.`, confirmLabel: 'Rejeitar' },
        reembolsar: { title: 'Processar reembolso?', description: `Confirmar reembolso de ${pending.valor} para "${pending.nome}".`, confirmLabel: 'Processar' },
      }
    : ({} as any);

  return (
    <AdminScreen
      title="Marketplace"
      activeRoute="AdminMarketplace"
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
        {marketplaceItens.map((m) => {
          const colors = STATUS_COLORS[m.status];
          return (
            <View key={m.id} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardTexts}>
                  <Text variant="sm" weight="bold">
                    {m.nome}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary">
                    {m.tipo} · {m.valor}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text variant="xs" weight="bold" color={colors.color}>
                    {m.status}
                  </Text>
                </View>
              </View>
              {m.status === 'Pendente' && (
                <View style={styles.actionsRow}>
                  <Pressable
                    style={styles.approveButton}
                    onPress={() => setPending({ id: m.id, nome: m.nome, kind: 'aprovar', valor: m.valor })}
                  >
                    <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                      Aprovar
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.rejectButton}
                    onPress={() => setPending({ id: m.id, nome: m.nome, kind: 'rejeitar', valor: m.valor })}
                  >
                    <Text variant="xs" weight="bold" color={theme.colors.error}>
                      Rejeitar
                    </Text>
                  </Pressable>
                </View>
              )}
              {m.status === 'Reembolso' && (
                <Pressable
                  style={styles.refundButton}
                  onPress={() => setPending({ id: m.id, nome: m.nome, kind: 'reembolsar', valor: m.valor })}
                >
                  <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                    Processar reembolso
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>

      {pending && (
        <ConfirmModal
          visible
          title={confirmCopy[pending.kind].title}
          description={confirmCopy[pending.kind].description}
          confirmLabel={confirmCopy[pending.kind].confirmLabel}
          onConfirm={handleConfirm}
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
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTexts: {
    flex: 1,
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  actionsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  approveButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceDark,
    paddingVertical: 7,
  },
  rejectButton: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(184,92,76,0.12)',
    paddingVertical: 7,
  },
  refundButton: {
    marginTop: 8,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceDark,
    paddingVertical: 7,
  },
});
