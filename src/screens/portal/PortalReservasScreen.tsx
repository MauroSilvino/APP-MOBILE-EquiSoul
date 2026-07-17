import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { RESERVA_ETAPA, RESERVA_FLUXO, usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalReservas'>;

const FILTROS = ['Hoje', 'Semana', 'Pendentes', 'Confirmadas', 'Canceladas', 'Concluídas'];

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  Pendente: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  Confirmada: { bg: 'rgba(107,115,83,0.15)', color: theme.colors.accent.moss },
  Cancelada: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error },
  Concluída: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.primary },
};

export function PortalReservasScreen({ navigation }: Props) {
  const reservas = usePortalStore((s) => s.reservas);
  const setReservaStatus = usePortalStore((s) => s.setReservaStatus);
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('Hoje');

  return (
    <PortalScreen
      title="Reservas"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.chipsRow}>
        {FILTROS.map((f) => (
          <Chip key={f} label={f} selected={filtro === f} onPress={() => setFiltro(f)} />
        ))}
      </View>

      <View style={styles.list}>
        {reservas.map((r) => {
          const colors = STATUS_COLORS[r.status];
          const etapaAtual = RESERVA_ETAPA[r.status];
          return (
            <View key={r.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={styles.cardTexts}>
                  <Text variant="sm" weight="bold">
                    {r.cliente}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {r.servico} · {r.data}
                  </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                  <Text variant="xs" weight="bold" color={colors.color}>
                    {r.status}
                  </Text>
                </View>
              </View>

              {r.status === 'Pendente' && (
                <View style={styles.acoesRow}>
                  <Pressable style={styles.aceitarButton} onPress={() => setReservaStatus(r.id, 'Confirmada')}>
                    <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                      Aceitar
                    </Text>
                  </Pressable>
                  <Pressable style={styles.recusarButton} onPress={() => setReservaStatus(r.id, 'Cancelada')}>
                    <Text variant="xs" weight="bold" color={theme.colors.error}>
                      Recusar
                    </Text>
                  </Pressable>
                </View>
              )}

              <View style={styles.fluxoRow}>
                {RESERVA_FLUXO.map((label, i) => (
                  <Text
                    key={label}
                    variant="xs"
                    weight="bold"
                    color={i <= etapaAtual ? theme.colors.accent.moss : 'tertiary'}
                    style={styles.fluxoLabel}
                  >
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cardTexts: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  acoesRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 6,
  },
  aceitarButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceDark,
  },
  recusarButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: 'rgba(196,90,60,0.12)',
  },
  fluxoRow: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 4,
  },
  fluxoLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8.5,
  },
});
