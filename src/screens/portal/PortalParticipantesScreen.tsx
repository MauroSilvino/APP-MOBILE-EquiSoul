import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PortalParticipanteStatus, usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalParticipantes'>;

const FILTROS = ['Confirmados', 'Pendentes', 'Check-in', 'VIP', 'Profissionais', 'Imprensa'];

const STATUS_COLORS: Record<PortalParticipanteStatus, { bg: string; color: string }> = {
  Confirmado: { bg: 'rgba(107,115,83,0.15)', color: theme.colors.accent.moss },
  Pendente: { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  'Check-in': { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  VIP: { bg: 'rgba(43,41,36,0.06)', color: theme.colors.text.primary },
};

export function PortalParticipantesScreen({ navigation }: Props) {
  const participantes = usePortalStore((s) => s.participantes);
  const checkinParticipante = usePortalStore((s) => s.checkinParticipante);
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>('Confirmados');

  return (
    <PortalScreen
      title="Participantes"
      activeModule="PortalOrganizadorDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.chipsRow}>
        {FILTROS.map((f) => (
          <Chip key={f} label={f} selected={filtro === f} onPress={() => setFiltro(f)} />
        ))}
      </View>

      <View style={styles.list}>
        {participantes.map((p) => {
          const colors = STATUS_COLORS[p.status];
          return (
            <Pressable key={p.id} style={styles.row} onPress={() => checkinParticipante(p.id)}>
              <ImagePlaceholder caption="" style={styles.avatar} />
              <View style={styles.rowTexts}>
                <Text variant="xs" weight="bold">
                  {p.nome}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.rowSubtitle}>
                  {p.categoria}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
                <Text variant="xs" weight="bold" color={colors.color}>
                  {p.status}
                </Text>
              </View>
            </Pressable>
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
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  rowTexts: {
    flex: 1,
  },
  rowSubtitle: {
    marginTop: 1,
  },
  statusBadge: {
    borderRadius: 9,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
});
