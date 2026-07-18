import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalAgenda'>;

const VISOES = ['Dia', 'Semana', 'Mês', 'Lista'] as const;

export function PortalAgendaScreen({ navigation }: Props) {
  const atendimentos = usePortalStore((s) => s.atendimentos);
  const aplicarAcao = usePortalStore((s) => s.aplicarAcaoAtendimento);
  const [visao, setVisao] = useState<(typeof VISOES)[number]>('Dia');

  return (
    <PortalScreen
      title="Agenda"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.chipsRow}>
        {VISOES.map((v) => (
          <Chip key={v} label={v} selected={visao === v} onPress={() => setVisao(v)} />
        ))}
      </View>

      <View style={styles.list}>
        {atendimentos.map((a) => {
          const isConfirmado = a.status === 'Confirmado';
          return (
            <View key={a.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text variant="sm" weight="extraBold">
                  {a.hora} · {a.servico}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: isConfirmado ? 'rgba(107,115,83,0.15)' : 'rgba(201,161,90,0.16)' },
                  ]}
                >
                  <Text variant="xs" weight="bold" color={isConfirmado ? theme.colors.accent.moss : theme.colors.accent.leather}>
                    {a.status}
                  </Text>
                </View>
              </View>
              <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                {a.cliente} · {a.cavalo} · {a.local}
              </Text>
              {!!a.acaoFeita && (
                <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.acaoFeita}>
                  {a.acaoFeita}
                </Text>
              )}
              <View style={styles.acoesRow}>
                {a.acoes.map((acao) => (
                  <Pressable key={acao} style={styles.acaoChip} onPress={() => aplicarAcao(a.id, acao)}>
                    <Text variant="xs" weight="bold">
                      {acao}
                    </Text>
                  </Pressable>
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
    gap: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 18,
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
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  cardSubtitle: {
    marginTop: 4,
  },
  acaoFeita: {
    marginTop: 10,
  },
  acoesRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  acaoChip: {
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
});
