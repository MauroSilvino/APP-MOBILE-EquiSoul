import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { AiIcon, BackIcon, RefreshIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { INSIGHTS_IA, useAIStore } from '../../store/useAIStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Insights'>;

export function InsightsScreen({ navigation }: Props) {
  const [atualizando, setAtualizando] = useState(false);
  const [atualizadoAgora, setAtualizadoAgora] = useState(false);
  const [abertos, setAbertos] = useState<string[]>([]);
  const { message, action, show } = useToast();

  const ignorados = useAIStore((state) => state.insightsIgnorados);
  const salvos = useAIStore((state) => state.insightsSalvos);
  const ignorarInsight = useAIStore((state) => state.ignorarInsight);
  const restaurarInsight = useAIStore((state) => state.restaurarInsight);
  const salvarInsight = useAIStore((state) => state.salvarInsight);

  const insights = INSIGHTS_IA.filter((insight) => !ignorados.includes(insight.id));

  const atualizar = () => {
    setAtualizando(true);
    setTimeout(() => {
      setAtualizando(false);
      setAtualizadoAgora(true);
    }, 900);
  };

  const toggleDetalhes = (id: string) =>
    setAbertos((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text variant="xl" weight="extraBold">
              Insights
            </Text>
            <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
              O que a IA percebeu na jornada de vocês.
            </Text>
          </View>
          <Pressable style={styles.refreshButton} onPress={atualizar}>
            {atualizando ? (
              <ActivityIndicator size="small" color={theme.colors.text.primary} />
            ) : (
              <RefreshIcon size={16} color={theme.colors.text.primary} strokeWidth={1.8} />
            )}
          </Pressable>
        </View>
        <Text variant="xs" weight="bold" color="tertiary" style={styles.atualizado}>
          {atualizadoAgora ? 'Atualizado agora' : 'Atualizado há 2 horas'}
        </Text>

        {atualizando ? (
          <View style={styles.carregando}>
            <ActivityIndicator size="small" color={theme.colors.accent.olive} />
            <Text variant="sm" weight="bold" color="secondary">
              Revendo os registros recentes…
            </Text>
          </View>
        ) : insights.length === 0 ? (
          <View style={styles.vazio}>
            <AiIcon size={34} color={theme.colors.text.tertiary} strokeWidth={1.6} />
            <Text variant="md" weight="bold" style={styles.vazioTitulo}>
              Nenhum insight por enquanto
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.vazioTexto}>
              Continue registrando momentos para a IA encontrar padrões.
            </Text>
          </View>
        ) : (
          <View style={styles.lista}>
            {insights.map((insight) => {
              const salvo = salvos.includes(insight.id);
              const aberto = abertos.includes(insight.id);
              return (
                <View key={insight.id} style={styles.card}>
                  <Text variant="sm" weight="bold" style={styles.cardTexto}>
                    {insight.texto}
                  </Text>
                  <View style={styles.cardAcoes}>
                    <Pressable onPress={() => toggleDetalhes(insight.id)}>
                      <Text variant="xs" weight="extraBold" color={theme.colors.accent.moss}>
                        {aberto ? 'Ocultar detalhes' : 'Ver detalhes'}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        salvarInsight(insight.id);
                        show('Insight salvo');
                      }}
                    >
                      <Text variant="xs" weight="extraBold" color={theme.colors.accent.moss}>
                        {salvo ? 'Salvo ✓' : 'Salvar'}
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        ignorarInsight(insight.id);
                        show('Insight removido', { label: 'Desfazer', onPress: () => restaurarInsight(insight.id) });
                      }}
                    >
                      <Text variant="xs" weight="extraBold" color={theme.colors.accent.leather}>
                        Ignorar
                      </Text>
                    </Pressable>
                  </View>
                  {aberto && (
                    <Text variant="xs" weight="medium" color="secondary" style={styles.cardDetalhe}>
                      {insight.detalhe}
                    </Text>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
      <Toast message={message} action={action} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: theme.spacing.xxl,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  refreshButton: {
    marginTop: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  atualizado: {
    marginTop: 2,
  },
  carregando: {
    marginTop: 40,
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  vazio: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  vazioTitulo: {
    textAlign: 'center',
  },
  vazioTexto: {
    textAlign: 'center',
    maxWidth: 220,
    lineHeight: 20,
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: 18,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  cardTexto: {
    lineHeight: 20,
  },
  cardAcoes: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  cardDetalhe: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(43,41,36,0.08)',
    lineHeight: 18,
  },
});
