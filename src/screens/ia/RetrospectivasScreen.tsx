import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { BackIcon, PlayIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Retrospectivas'>;

const TIPOS = ['Mensal', 'Semestral', 'Anual'];
const INGREDIENTES = ['Vídeo', 'Fotos', 'Música', 'Mapa'];

export function RetrospectivasScreen({ navigation }: Props) {
  const [tipo, setTipo] = useState('Mensal');
  const [carregando, setCarregando] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ingredientesSel, setIngredientesSel] = useState<Record<string, boolean>>({
    Vídeo: true,
    Fotos: true,
    Música: false,
    Mapa: false,
  });
  const { message, show } = useToast();

  const selecionarTipo = (label: string) => {
    setTipo(label);
    setPlaying(false);
    setCarregando(true);
    setTimeout(() => setCarregando(false), 700);
  };

  const toggleIngrediente = (label: string) =>
    setIngredientesSel((current) => ({ ...current, [label]: !current[label] }));

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xl" weight="extraBold">
          Retrospectivas
        </Text>

        <View style={styles.chips}>
          {TIPOS.map((label) => (
            <Pressable
              key={label}
              style={[styles.chip, tipo === label && styles.chipSelected]}
              onPress={() => selecionarTipo(label)}
            >
              <Text variant="sm" weight="bold" color={tipo === label ? theme.colors.accent.gold : 'primary'}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {carregando ? (
          <View style={styles.carregando}>
            <ActivityIndicator size="small" color={theme.colors.accent.gold} />
            <Text variant="sm" weight="bold" color="secondary">
              Montando a retrospectiva {tipo}…
            </Text>
          </View>
        ) : (
          <ImagePlaceholder caption={`retrospectiva ${tipo}`} style={styles.preview}>
            <Pressable style={styles.playButton} onPress={() => setPlaying((current) => !current)}>
              <PlayIcon size={playing ? 20 : 22} color="#FBF9F4" />
            </Pressable>
          </ImagePlaceholder>
        )}

        <View style={styles.ingredientes}>
          {INGREDIENTES.map((label) => (
            <Pressable
              key={label}
              style={[styles.ingredienteChip, ingredientesSel[label] && styles.chipSelected]}
              onPress={() => toggleIngrediente(label)}
            >
              <Text variant="xs" weight="semiBold" color={ingredientesSel[label] ? theme.colors.accent.gold : 'primary'}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.acoes}>
          <Pressable style={styles.assistirButton} onPress={() => setPlaying((current) => !current)}>
            <Text variant="sm" weight="extraBold">
              {playing ? 'Pausar' : 'Assistir'}
            </Text>
          </Pressable>
          <Pressable
            style={styles.compartilharButton}
            onPress={() => show('Link da retrospectiva copiado')}
          >
            <Text variant="sm" weight="bold">
              Compartilhar
            </Text>
          </Pressable>
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
  chips: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
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
    marginTop: theme.spacing.md,
    height: 220,
    borderRadius: 22,
    backgroundColor: 'rgba(43,41,36,0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.md,
  },
  preview: {
    marginTop: theme.spacing.md,
    height: 220,
    borderRadius: 22,
    overflow: 'hidden',
  },
  playButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(43,41,36,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ingredientes: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  ingredienteChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  acoes: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  assistirButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compartilharButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
