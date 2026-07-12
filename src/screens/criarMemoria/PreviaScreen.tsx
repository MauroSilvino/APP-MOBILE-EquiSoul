import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Previa'>;

export function PreviaScreen({ navigation }: Props) {
  const draft = useMemoriesStore((state) => state.criarMemoriaDraft);
  const finalizarCriarMemoria = useMemoriesStore((state) => state.finalizarCriarMemoria);
  const salvarRascunho = useMemoriesStore((state) => state.salvarRascunho);
  const [celebrando, setCelebrando] = useState(false);

  const tipoLabel = draft.tipo || 'seu cavalo';
  const previewTitle = draft.tipo ? `${draft.tipo} de hoje` : 'Sua memória de hoje';
  const previewTexto = draft.descricao || 'Uma página a mais na história de vocês dois.';

  const fragments = [draft.tipo ? `Este registro de ${draft.tipo.toLowerCase()}` : 'Este momento'];
  if (draft.cavaloHumor) fragments.push(`mostra seu cavalo se sentindo ${draft.cavaloHumor.toLowerCase()}`);
  if (draft.duracao) fragments.push(`ao longo de ${draft.duracao} minutos juntos`);
  if (draft.local) fragments.push(`em ${draft.local}`);
  const aiInsight = `${fragments.join(', ')}.`;

  function publicar() {
    setCelebrando(true);
    setTimeout(() => {
      const id = finalizarCriarMemoria();
      setCelebrando(false);
      navigation.navigate('MemoriaPublicada', { id });
    }, 1100);
  }

  function salvarComoRascunho() {
    salvarRascunho();
    navigation.navigate('Rascunhos');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ProgressBar step={7} total={7} />
          <Text variant="xl" weight="extraBold">
            Prévia
          </Text>
        </View>

        <View style={styles.card}>
          <ImagePlaceholder style={styles.hero} caption="foto · sua memória" />
          <View style={styles.cardBody}>
            <Text variant="lg" weight="extraBold">
              {previewTitle}
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.texto}>
              {previewTexto}
            </Text>
            <View style={styles.tags}>
              <View style={styles.tag}>
                <Text variant="xs" weight="semiBold">
                  {tipoLabel}
                </Text>
              </View>
              {!!draft.local && (
                <View style={styles.tag}>
                  <Text variant="xs" weight="semiBold">
                    {draft.local}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.iaCard}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.iaEyebrow}>
                IA
              </Text>
              <Text variant="sm" weight="semiBold" style={styles.iaText}>
                {aiInsight}
              </Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.publishButton} onPress={publicar}>
          <Text variant="lg" weight="extraBold">
            Publicar
          </Text>
        </Pressable>
        <View style={styles.secondaryRow}>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('TipoMemoria')}>
            <Text variant="sm" weight="bold">
              Editar
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={salvarComoRascunho}>
            <Text variant="sm" weight="bold">
              Salvar rascunho
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {celebrando && (
        <View style={styles.celebration}>
          <View style={styles.celebrationIcon}>
            <CheckIcon size={30} strokeWidth={2.5} />
          </View>
          <Text variant="lg" weight="extraBold" color="inverse">
            Memória publicada!
          </Text>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
  },
  card: {
    marginTop: theme.spacing.lg,
    marginHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 26,
    elevation: 3,
  },
  hero: {
    height: 220,
  },
  cardBody: {
    padding: theme.cardPadding.max,
  },
  texto: {
    marginTop: theme.spacing.xs,
  },
  tags: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  iaCard: {
    marginTop: theme.spacing.md,
    borderRadius: 14,
    padding: theme.cardPadding.min,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.xs,
  },
  publishButton: {
    marginTop: theme.spacing.xl,
    marginHorizontal: theme.spacing.xl,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryRow: {
    marginTop: theme.spacing.sm,
    marginHorizontal: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  celebration: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(43,41,36,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  celebrationIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
