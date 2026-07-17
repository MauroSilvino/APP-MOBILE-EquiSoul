import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminFinanceiro'>;

export function AdminFinanceiroScreen({ navigation }: Props) {
  const receitas = useAdminStore((s) => s.receitas);
  const integracoes = useAdminStore((s) => s.integracoes);
  const toggleIntegracao = useAdminStore((s) => s.toggleIntegracao);
  const [pendingDisconnect, setPendingDisconnect] = useState<string | null>(null);

  return (
    <AdminScreen
      title="Financeiro"
      activeRoute="AdminFinanceiro"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.list}>
        {receitas.map((r) => (
          <View key={r.label} style={styles.receitaRow}>
            <Text variant="sm" weight="bold">
              {r.label}
            </Text>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              {r.valor}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        INTEGRAÇÕES
      </Text>
      <View style={styles.list}>
        {integracoes.map((i) => (
          <View key={i.nome} style={styles.integracaoRow}>
            <Text variant="sm" weight="bold">
              {i.nome}
            </Text>
            <View style={styles.integracaoRight}>
              <View style={styles.statusWrap}>
                <View style={[styles.dot, { backgroundColor: i.desconectado ? theme.colors.text.tertiary : theme.colors.accent.olive }]} />
                <Text variant="xs" weight="bold" color={i.desconectado ? theme.colors.text.tertiary : theme.colors.accent.moss}>
                  {i.desconectado ? 'Desconectado' : 'Ativo'}
                </Text>
              </View>
              <Pressable onPress={() => (i.desconectado ? toggleIntegracao(i.nome) : setPendingDisconnect(i.nome))}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.actionLabel}>
                  {i.desconectado ? 'Conectar' : 'Desconectar'}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {pendingDisconnect && (
        <ConfirmModal
          visible
          title="Desconectar integração?"
          description={`Desconectar "${pendingDisconnect}" interrompe pagamentos por esse meio.`}
          confirmLabel="Desconectar"
          danger
          onConfirm={() => {
            toggleIntegracao(pendingDisconnect);
            setPendingDisconnect(null);
          }}
          onCancel={() => setPendingDisconnect(null)}
        />
      )}
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  receitaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  integracaoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  integracaoRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  actionLabel: {
    textDecorationLine: 'underline',
  },
});
