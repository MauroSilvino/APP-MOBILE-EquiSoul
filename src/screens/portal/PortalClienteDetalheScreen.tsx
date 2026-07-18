import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalClienteDetalhe'>;

const ABAS = ['Histórico', 'Serviços', 'Mensagens', 'Pagamentos', 'Arquivos', 'Observações'];

export function PortalClienteDetalheScreen({ navigation, route }: Props) {
  const cliente = usePortalStore((s) => s.clientes.find((c) => c.id === route.params.id) ?? s.clientes[0]);
  const historicoPorAba = usePortalStore((s) => s.clienteHistoricoPorAba);
  const [aba, setAba] = useState<(typeof ABAS)[number]>('Histórico');
  const itens = historicoPorAba[aba] ?? [];

  return (
    <PortalScreen
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(r) => navigation.navigate(r)}
    >
      <View style={styles.header}>
        <ImagePlaceholder caption="" style={styles.avatar} />
        <View>
          <Text variant="lg" weight="extraBold">
            {cliente.nome}
          </Text>
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.headerSubtitle}>
            {cliente.cidade} · {cliente.cavalos} cavalo(s)
          </Text>
        </View>
      </View>

      <View style={styles.chipsRow}>
        {ABAS.map((a) => (
          <Chip key={a} label={a} selected={aba === a} onPress={() => setAba(a)} />
        ))}
      </View>

      <View style={styles.list}>
        {itens.map((h, i) => (
          <View key={i} style={styles.card}>
            <Text variant="sm" weight="bold">
              {h.titulo}
            </Text>
            {!!(h.data || h.valor) && (
              <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                {[h.data, h.valor].filter(Boolean).join(' · ')}
              </Text>
            )}
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  headerSubtitle: {
    marginTop: 2,
  },
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
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardSubtitle: {
    marginTop: 2,
  },
});
