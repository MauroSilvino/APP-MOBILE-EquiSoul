import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminAPIs'>;

type PendingAction = { key: string; nome: string; kind: 'rotacionar' | 'revogar' };

export function AdminAPIsScreen({ navigation }: Props) {
  const apis = useAdminStore((s) => s.apis);
  const rotacionarApi = useAdminStore((s) => s.rotacionarApi);
  const revogarApi = useAdminStore((s) => s.revogarApi);
  const [pending, setPending] = useState<PendingAction | null>(null);
  const { message, show } = useToast();

  function handleConfirm() {
    if (!pending) return;
    if (pending.kind === 'rotacionar') rotacionarApi(pending.key);
    if (pending.kind === 'revogar') revogarApi(pending.key);
    setPending(null);
  }

  return (
    <AdminScreen
      title="APIs"
      activeRoute="AdminAPIs"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        CHAVES E CLIENTES
      </Text>
      <View style={styles.list}>
        {apis.map((a) => (
          <View key={a.key} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text variant="sm" weight="bold">
                {a.nome}
              </Text>
              <Text variant="xs" weight="semiBold" color="secondary">
                {a.rateLimit}
              </Text>
            </View>
            <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.chave}>
              {a.revoked ? '••• revogada •••' : a.chave}
            </Text>
            {a.revoked ? (
              <Text variant="xs" weight="bold" color={theme.colors.error} style={styles.revogada}>
                Revogada
              </Text>
            ) : (
              <View style={styles.actionsRow}>
                <Pressable style={styles.neutralAction} onPress={() => show('Chave copiada')}>
                  <Text variant="xs" weight="bold">
                    Copiar
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.neutralAction}
                  onPress={() => setPending({ key: a.key, nome: a.nome, kind: 'rotacionar' })}
                >
                  <Text variant="xs" weight="bold">
                    Rotacionar
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.dangerAction}
                  onPress={() => setPending({ key: a.key, nome: a.nome, kind: 'revogar' })}
                >
                  <Text variant="xs" weight="bold" color={theme.colors.error}>
                    Revogar
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </View>

      {pending && (
        <ConfirmModal
          visible
          title={pending.kind === 'rotacionar' ? 'Rotacionar chave?' : 'Revogar chave?'}
          description={
            pending.kind === 'rotacionar'
              ? `Gerar uma nova chave para "${pending.nome}"? A chave atual deixará de funcionar.`
              : `Revogar acesso de "${pending.nome}" imediatamente?`
          }
          confirmLabel={pending.kind === 'rotacionar' ? 'Rotacionar' : 'Revogar'}
          danger={pending.kind === 'revogar'}
          onConfirm={handleConfirm}
          onCancel={() => setPending(null)}
        />
      )}
      <Toast message={message} />
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    marginTop: theme.spacing.md,
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
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
  },
  chave: {
    marginTop: 3,
  },
  revogada: {
    marginTop: 8,
  },
  actionsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  neutralAction: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingVertical: 6,
  },
  dangerAction: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 9,
    backgroundColor: 'rgba(184,92,76,0.12)',
    paddingVertical: 6,
  },
});
