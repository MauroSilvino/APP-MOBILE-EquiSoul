import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PEDIDO_TIMELINE, usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalPedidos'>;

const PAGE_SIZE = 3;

export function PortalPedidosScreen({ navigation }: Props) {
  const pedidos = usePortalStore((s) => s.pedidos);
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);
  const visivelList = pedidos.slice(0, visiveis);
  const temMais = pedidos.length > visiveis;

  return (
    <PortalScreen
      title="Pedidos"
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.list}>
        {visivelList.map((p) => (
          <Pressable key={p.id} style={styles.card} onPress={() => navigation.navigate('PortalPedidoDetalhe', { id: p.id })}>
            <View style={styles.cardHeader}>
              <Text variant="sm" weight="bold">
                Pedido #{p.numero}
              </Text>
              <Text variant="sm" weight="extraBold" color={theme.colors.accent.leather}>
                {p.valor}
              </Text>
            </View>
            <Text variant="xs" weight="medium" color="secondary" style={styles.cardCliente}>
              {p.cliente}
            </Text>
            <View style={styles.timelineRow}>
              {PEDIDO_TIMELINE.map((label, i) => {
                const ativo = i <= p.etapaAtual;
                return (
                  <View
                    key={label}
                    style={[styles.timelineChip, { backgroundColor: ativo ? 'rgba(107,115,83,0.15)' : 'rgba(43,41,36,0.06)' }]}
                  >
                    <Text variant="xs" weight="bold" color={ativo ? theme.colors.accent.moss : 'tertiary'}>
                      {label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </Pressable>
        ))}
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
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardCliente: {
    marginTop: 4,
  },
  timelineRow: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  timelineChip: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  loadMore: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
