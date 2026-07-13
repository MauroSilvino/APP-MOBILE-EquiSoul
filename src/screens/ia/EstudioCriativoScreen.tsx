import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { mockAIService } from '../../services/aiService';

type Props = NativeStackScreenProps<RootStackParamList, 'EstudioCriativo'>;

const TIPOS = ['Vídeo', 'Story', 'Reel', 'Carrossel', 'Colagem', 'Capa', 'Pôster', 'Frase', 'Legenda'];
const PLATAFORMAS = ['Instagram', 'TikTok', 'WhatsApp', 'Pinterest', 'Facebook'];

export function EstudioCriativoScreen({ navigation }: Props) {
  const [tipo, setTipo] = useState('Vídeo');
  const [plataforma, setPlataforma] = useState('Instagram');
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);
  const { message, show } = useToast();

  const selecionar = (setter: (v: string) => void, valor: string) => {
    setter(valor);
    setResultado(null);
  };

  const gerar = async () => {
    setCarregando(true);
    setResultado(null);
    const response = await mockAIService.generateCreativeContent({ tipo, plataforma });
    setCarregando(false);
    setResultado(response.previewLabel);
  };

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleRow}>
          <Text variant="xl" weight="extraBold">
            Estúdio criativo
          </Text>
          <View style={styles.premiumBadge}>
            <Text variant="xs" weight="extraBold" color={theme.colors.accent.leather}>
              Premium
            </Text>
          </View>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          O QUE CRIAR?
        </Text>
        <View style={styles.chips}>
          {TIPOS.map((label) => (
            <Pressable
              key={label}
              style={[styles.chip, tipo === label && styles.chipSelected]}
              onPress={() => selecionar(setTipo, label)}
            >
              <Text variant="sm" weight="bold" color={tipo === label ? theme.colors.accent.gold : 'primary'}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          FORMATO
        </Text>
        <View style={styles.chips}>
          {PLATAFORMAS.map((label) => (
            <Pressable
              key={label}
              style={[styles.chip, plataforma === label && styles.chipSelected]}
              onPress={() => selecionar(setPlataforma, label)}
            >
              <Text variant="sm" weight="bold" color={plataforma === label ? theme.colors.accent.gold : 'primary'}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {carregando ? (
          <View style={styles.carregando}>
            <ActivityIndicator size="small" color={theme.colors.accent.gold} />
            <Text variant="sm" weight="bold" color="secondary">
              A IA está criando…
            </Text>
          </View>
        ) : resultado ? (
          <View>
            <ImagePlaceholder caption={resultado} style={styles.preview}>
              <View style={styles.geradoBadge}>
                <Text variant="xs" weight="extraBold" color="inverse">
                  Gerado ✓
                </Text>
              </View>
            </ImagePlaceholder>
            <View style={styles.resultadoAcoes}>
              <Pressable style={styles.resultadoBotao} onPress={() => show('Download iniciado')}>
                <Text variant="sm" weight="bold">
                  Baixar
                </Text>
              </Pressable>
              <Pressable style={styles.resultadoBotao} onPress={() => show('Pronto para compartilhar')}>
                <Text variant="sm" weight="bold">
                  Compartilhar
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <ImagePlaceholder caption={`prévia · ${tipo} para ${plataforma}`} style={styles.preview} />
        )}

        <Pressable style={styles.gerarButton} onPress={gerar} disabled={carregando}>
          <Text variant="md" weight="extraBold">
            {carregando ? 'Gerando…' : resultado ? 'Gerar novamente' : 'Gerar com IA'}
          </Text>
        </Pressable>
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  premiumBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  carregando: {
    marginTop: theme.spacing.lg,
    height: 220,
    borderRadius: 20,
    backgroundColor: 'rgba(43,41,36,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  preview: {
    marginTop: theme.spacing.lg,
    height: 220,
    borderRadius: 20,
    overflow: 'hidden',
  },
  geradoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(107,115,83,0.85)',
  },
  resultadoAcoes: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  resultadoBotao: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gerarButton: {
    marginTop: theme.spacing.lg,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
