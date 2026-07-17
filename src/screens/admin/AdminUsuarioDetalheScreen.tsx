import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminUsuarioDetalhe'>;

type PendingAction = 'banir' | 'verificar' | 'reembolsar' | null;

export function AdminUsuarioDetalheScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const usuarios = useAdminStore((s) => s.usuarios);
  const usuario = usuarios.find((u) => u.id === id) ?? usuarios[0];
  const banirUsuario = useAdminStore((s) => s.banirUsuario);
  const reativarUsuario = useAdminStore((s) => s.reativarUsuario);
  const verificarUsuario = useAdminStore((s) => s.verificarUsuario);
  const [pending, setPending] = useState<PendingAction>(null);
  const { message, show } = useToast();

  const banido = usuario.status === 'Banido';
  const verificado = usuario.status === 'Verificado';

  function handleConfirm() {
    if (pending === 'banir') banirUsuario(usuario.id);
    if (pending === 'verificar') verificarUsuario(usuario.id);
    if (pending === 'reembolsar') show('Reembolso processado');
    setPending(null);
  }

  const confirmCopy: Record<Exclude<PendingAction, null>, { title: string; description: string; confirmLabel: string; danger?: boolean }> = {
    banir: {
      title: 'Banir usuário?',
      description: `Banir "${usuario.nome}"? Ele perderá acesso à plataforma.`,
      confirmLabel: 'Banir',
      danger: true,
    },
    verificar: {
      title: 'Verificar usuário?',
      description: `Marcar "${usuario.nome}" como verificado?`,
      confirmLabel: 'Verificar',
    },
    reembolsar: {
      title: 'Processar reembolso?',
      description: `Reembolsar a última cobrança de "${usuario.nome}"?`,
      confirmLabel: 'Reembolsar',
    },
  };

  return (
    <AdminScreen
      title={usuario.nome}
      activeRoute="AdminUsuarios"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route2) => navigation.navigate(route2)}
      onNavigateUsuario={(uid) => navigation.navigate('AdminUsuarioDetalhe', { id: uid })}
      onNavigateCavalo={(cid) => navigation.navigate('AdminCavaloDetalhe', { id: cid })}
      onNavigateChamado={(chid) => navigation.navigate('AdminChamadoDetalhe', { id: chid })}
    >
      <View style={styles.headerRow}>
        <ImagePlaceholder caption="" style={styles.avatar} />
        <Text variant="sm" weight="semiBold" color="secondary">
          {usuario.cidade}
        </Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Email" value={usuario.email} />
        <InfoRow label="Plano" value={usuario.plano} />
        <InfoRow label="Cliente desde" value={usuario.desde} />
        <InfoRow label="Status" value={usuario.status} />
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        AÇÕES
      </Text>
      <View style={styles.actions}>
        {banido ? (
          <Pressable style={styles.actionPrimary} onPress={() => reativarUsuario(usuario.id)}>
            <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
              Reativar usuário
            </Text>
          </Pressable>
        ) : (
          <Pressable style={styles.actionDanger} onPress={() => setPending('banir')}>
            <Text variant="sm" weight="extraBold" color={theme.colors.error}>
              Banir usuário
            </Text>
          </Pressable>
        )}
        {!verificado && (
          <Pressable style={styles.actionNeutral} onPress={() => setPending('verificar')}>
            <Text variant="sm" weight="extraBold">
              Verificar usuário
            </Text>
          </Pressable>
        )}
        <Pressable style={styles.actionNeutral} onPress={() => setPending('reembolsar')}>
          <Text variant="sm" weight="extraBold">
            Reembolsar última cobrança
          </Text>
        </Pressable>
        <Pressable style={styles.actionNeutral} onPress={() => show('Mensagem enviada')}>
          <Text variant="sm" weight="extraBold">
            Enviar mensagem
          </Text>
        </Pressable>
      </View>

      {pending && (
        <ConfirmModal
          visible
          title={confirmCopy[pending].title}
          description={confirmCopy[pending].description}
          confirmLabel={confirmCopy[pending].confirmLabel}
          danger={confirmCopy[pending].danger}
          onConfirm={handleConfirm}
          onCancel={() => setPending(null)}
        />
      )}
      <Toast message={message} />
    </AdminScreen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant="xs" weight="semiBold" color="secondary">
        {label}
      </Text>
      <Text variant="sm" weight="bold">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  card: {
    marginTop: theme.spacing.lg,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  actions: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  actionPrimary: {
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionDanger: {
    borderRadius: 14,
    backgroundColor: 'rgba(184,92,76,0.12)',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionNeutral: {
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
