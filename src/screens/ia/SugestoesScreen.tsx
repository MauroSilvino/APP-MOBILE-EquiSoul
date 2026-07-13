import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { SUGESTOES_IA, useAIStore } from '../../store/useAIStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Sugestoes'>;

export function SugestoesScreen({ navigation }: Props) {
  const aceitas = useAIStore((state) => state.sugestoesAceitas);
  const depois = useAIStore((state) => state.sugestoesDepois);
  const aceitarSugestao = useAIStore((state) => state.aceitarSugestao);
  const adiarSugestao = useAIStore((state) => state.adiarSugestao);
  const { message, show } = useToast();

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xl" weight="extraBold">
          Sugestões
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Só ideias — nunca obrigações.
        </Text>

        <View style={styles.lista}>
          {SUGESTOES_IA.map((sugestao) => {
            const aceita = aceitas.includes(sugestao.id);
            const adiada = depois.includes(sugestao.id);
            const label = aceita ? 'Combinado ✓' : adiada ? 'Lembrete guardado' : 'Boa ideia';
            return (
              <View key={sugestao.id} style={styles.card}>
                <Text variant="sm" weight="bold" style={styles.cardTexto}>
                  {sugestao.texto}
                </Text>
                <View style={styles.cardAcoes}>
                  <Pressable
                    style={[styles.acaoBotao, aceita ? styles.acaoBotaoMuted : styles.acaoBotaoGold]}
                    onPress={() => {
                      aceitarSugestao(sugestao.id);
                      show('Combinado! Vamos lembrar vocês.');
                    }}
                  >
                    <Text variant="xs" weight="extraBold" color={aceita ? theme.colors.accent.moss : 'primary'}>
                      {label}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      adiarSugestao(sugestao.id);
                      show('Vamos sugerir de novo mais tarde');
                    }}
                  >
                    <Text variant="xs" weight="bold" color="secondary" style={styles.depoisLabel}>
                      Depois
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Toast message={message} />
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
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: 18,
    padding: theme.spacing.md,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardTexto: {
    lineHeight: 20,
  },
  cardAcoes: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  acaoBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  acaoBotaoGold: {
    backgroundColor: theme.colors.accent.gold,
  },
  acaoBotaoMuted: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  depoisLabel: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
