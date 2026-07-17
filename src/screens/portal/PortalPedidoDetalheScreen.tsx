import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PEDIDO_TIMELINE, usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalPedidoDetalhe'>;

export function PortalPedidoDetalheScreen({ navigation, route }: Props) {
  const pedido = usePortalStore((s) => s.pedidos.find((p) => p.id === route.params.id) ?? s.pedidos[0]);
  const avancarPedido = usePortalStore((s) => s.avancarPedido);
  const etapaFinal = pedido.etapaAtual >= PEDIDO_TIMELINE.length - 1;

  return (
    <PortalScreen
      title={`Pedido #${pedido.numero}`}
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(r) => navigation.navigate(r)}
    >
      <Text variant="sm" weight="semiBold" color="secondary" style={styles.subtitle}>
        {pedido.cliente} · {pedido.valor}
      </Text>

      <View style={styles.timeline}>
        {PEDIDO_TIMELINE.map((label, i) => {
          const ativo = i <= pedido.etapaAtual;
          const color = ativo ? theme.colors.accent.moss : 'tertiary';
          return (
            <View key={label} style={styles.timelineRow}>
              <View
                style={[
                  styles.timelineDot,
                  { backgroundColor: ativo ? theme.colors.accent.moss : theme.colors.text.tertiary },
                ]}
              />
              <Text variant="sm" weight="bold" color={color}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      {etapaFinal ? (
        <Text variant="sm" weight="bold" color={theme.colors.accent.moss} style={styles.entregueText}>
          Pedido entregue ✓
        </Text>
      ) : (
        <Pressable style={styles.avancarButton} onPress={() => avancarPedido(pedido.id)}>
          <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
            Avançar para próxima etapa
          </Text>
        </Pressable>
      )}
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 4,
  },
  timeline: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  timelineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  entregueText: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  avancarButton: {
    marginTop: theme.spacing.lg,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
