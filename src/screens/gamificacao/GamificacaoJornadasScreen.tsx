import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { JORNADAS_CATALOG, useConquistaContext } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoJornadas'>;

export function GamificacaoJornadasScreen({ navigation }: Props) {
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const nomeCavalo = horse?.nome || 'seu cavalo';
  const ctx = useConquistaContext();
  const [expandido, setExpandido] = useState<string | null>(null);

  const jornada = JORNADAS_CATALOG[0];

  const etapasStatus = jornada.etapas.map((etapa, index, arr) => {
    const concluida = etapa.isConcluida(ctx);
    const anteriorConcluida = index === 0 || arr[index - 1].isConcluida(ctx);
    const status = concluida ? 'Concluída' : anteriorConcluida ? 'Em andamento' : 'Bloqueada';
    return { ...etapa, concluida, status };
  });

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Voltar ao centro de evolução"
            style={styles.backButton}
            onPress={() => navigation.navigate('GamificacaoHub')}
            hitSlop={8}
          >
            <BackIcon size={15} strokeWidth={2.2} />
          </Pressable>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Jornadas
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Histórias longas, construídas com o tempo.
        </Text>

        <Text variant="sm" weight="bold" style={styles.jornadaTitulo}>
          {jornada.titulo} — você e {nomeCavalo}
        </Text>

        <View style={styles.timeline}>
          {etapasStatus.map((etapa, index) => {
            const isLast = index === etapasStatus.length - 1;
            const isExpanded = expandido === etapa.id;
            return (
              <View key={etapa.id} style={styles.etapaRow}>
                <View style={styles.etapaMarkerCol}>
                  <View
                    style={[
                      styles.etapaDot,
                      etapa.concluida ? styles.etapaDotDone : styles.etapaDotPending,
                    ]}
                  />
                  {!isLast && <View style={styles.etapaLine} />}
                </View>
                <Pressable
                  style={styles.etapaBody}
                  onPress={() => setExpandido(isExpanded ? null : etapa.id)}
                >
                  <Text
                    variant="sm"
                    weight="bold"
                    color={etapa.concluida ? 'primary' : theme.colors.text.tertiary}
                  >
                    {etapa.titulo}
                  </Text>
                  <Text variant="xs" weight="semiBold" color="secondary" style={styles.etapaStatus}>
                    {etapa.status}
                  </Text>
                  {isExpanded && (
                    <View style={styles.etapaDetalheCard}>
                      <Text variant="xs" weight="medium" color="secondary" style={styles.etapaDetalheText}>
                        {etapa.detalhe}
                      </Text>
                    </View>
                  )}
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  eyebrow: {
    letterSpacing: 0.6,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  jornadaTitulo: {
    marginTop: theme.spacing.lg,
  },
  timeline: {
    marginTop: theme.spacing.md,
  },
  etapaRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  etapaMarkerCol: {
    alignItems: 'center',
  },
  etapaDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
  },
  etapaDotDone: {
    backgroundColor: theme.colors.accent.olive,
    borderColor: theme.colors.accent.olive,
  },
  etapaDotPending: {
    backgroundColor: '#fff',
    borderColor: 'rgba(43,41,36,0.2)',
  },
  etapaLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.12)',
    marginVertical: 2,
  },
  etapaBody: {
    flex: 1,
    paddingBottom: theme.spacing.lg,
  },
  etapaStatus: {
    marginTop: 2,
  },
  etapaDetalheCard: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.md,
  },
  etapaDetalheText: {
    lineHeight: 18,
  },
});
