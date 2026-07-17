import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminChamadoDetalhe'>;

export function AdminChamadoDetalheScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const chamados = useAdminStore((s) => s.chamados);
  const setChamadoStatus = useAdminStore((s) => s.setChamadoStatus);
  const setChamadoResposta = useAdminStore((s) => s.setChamadoResposta);
  const chamado = chamados.find((c) => c.id === id) ?? chamados[0];
  const resolvido = chamado.status === 'Resolvido';

  return (
    <AdminScreen
      title={chamado.assunto}
      activeRoute="AdminSuporte"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route2) => navigation.navigate(route2)}
      onNavigateUsuario={(uid) => navigation.navigate('AdminUsuarioDetalhe', { id: uid })}
      onNavigateCavalo={(cid) => navigation.navigate('AdminCavaloDetalhe', { id: cid })}
      onNavigateChamado={(chid) => navigation.navigate('AdminChamadoDetalhe', { id: chid })}
    >
      <Text variant="sm" weight="semiBold" color="secondary" style={styles.meta}>
        {chamado.cliente} · {chamado.categoria} · SLA {chamado.sla} · {chamado.status}
      </Text>

      <View style={styles.mensagemCard}>
        <Text variant="sm" weight="medium">
          {chamado.mensagem}
        </Text>
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        RESPONDER
      </Text>
      <TextInput
        value={chamado.resposta}
        onChangeText={(text) => setChamadoResposta(chamado.id, text)}
        placeholder="Escreva uma resposta para o usuário…"
        multiline
        style={styles.textarea}
        placeholderTextColor={theme.colors.text.tertiary}
      />

      {resolvido ? (
        <Pressable style={styles.reopenButton} onPress={() => setChamadoStatus(chamado.id, 'Aberto')}>
          <Text variant="sm" weight="extraBold">
            Reabrir chamado
          </Text>
        </Pressable>
      ) : (
        <Pressable style={styles.resolveButton} onPress={() => setChamadoStatus(chamado.id, 'Resolvido')}>
          <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
            Enviar e marcar como resolvido
          </Text>
        </Pressable>
      )}
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  meta: {
    marginTop: theme.spacing.xs,
  },
  mensagemCard: {
    marginTop: theme.spacing.lg,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
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
  textarea: {
    marginTop: theme.spacing.sm,
    width: '100%',
    height: 100,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(43,41,36,0.14)',
    padding: 12,
    fontSize: 12,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  reopenButton: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resolveButton: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
