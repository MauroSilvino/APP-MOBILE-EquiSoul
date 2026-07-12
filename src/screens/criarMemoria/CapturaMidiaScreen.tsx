import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CameraIcon, CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { MidiaItem, useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CapturaMidia'>;

export function CapturaMidiaScreen({ navigation }: Props) {
  const draft = useMemoriesStore((state) => state.criarMemoriaDraft);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  const tipoLabel = draft.tipo || 'seu cavalo';

  function addItems(assets: ImagePicker.ImagePickerAsset[]) {
    const novos: MidiaItem[] = assets.map((asset) => ({
      id: `${Date.now()}-${Math.random()}`,
      uri: asset.uri,
      tipo: asset.type === 'video' ? 'video' : 'image',
    }));
    setCriarMemoriaDraft({ midiaItems: [...draft.midiaItems, ...novos] });
  }

  async function abrirCamera(tipo: 'images' | 'videos') {
    let permission = cameraPermission;
    if (!permission?.granted) {
      permission = await requestCameraPermission();
    }
    if (!permission.granted) return;

    const result = await ImagePicker.launchCameraAsync({ mediaTypes: [tipo], quality: 0.8 });
    if (!result.canceled) addItems(result.assets);
  }

  async function abrirGaleria() {
    let permission = libraryPermission;
    if (!permission?.granted) {
      permission = await requestLibraryPermission();
    }
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!result.canceled) addItems(result.assets);
  }

  function removerItem(id: string) {
    setCriarMemoriaDraft({ midiaItems: draft.midiaItems.filter((item) => item.id !== id) });
  }

  return (
    <Screen style={styles.screen}>
      <ProgressBar step={2} total={7} />
      <Text variant="xxl" weight="extraBold">
        Adicione a mídia
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        Fotos ou vídeos deste momento com {tipoLabel}.
      </Text>

      <View style={styles.chipsRow}>
        <Pressable style={styles.chip} onPress={() => abrirCamera('images')}>
          <CameraIcon color={theme.colors.accent.leather} />
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
            Câmera
          </Text>
        </Pressable>
        <Pressable style={styles.chip} onPress={() => abrirCamera('videos')}>
          <CameraIcon color={theme.colors.accent.leather} />
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
            Vídeo
          </Text>
        </Pressable>
        <Pressable style={styles.chip} onPress={abrirGaleria}>
          <CameraIcon color={theme.colors.accent.leather} />
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
            Galeria
          </Text>
        </Pressable>
      </View>

      {draft.midiaItems.length > 0 && (
        <>
          <ScrollView contentContainerStyle={styles.grid}>
            <View style={styles.gridInner}>
              {draft.midiaItems.map((item) => (
                <View key={item.id} style={styles.thumb}>
                  {item.tipo === 'video' && (
                    <View style={styles.videoBadge}>
                      <Text variant="xs" weight="bold" color="inverse">
                        ▶
                      </Text>
                    </View>
                  )}
                  <Pressable style={styles.removeButton} onPress={() => removerItem(item.id)}>
                    <CloseIcon />
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>

          <View style={styles.iaCard}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.iaEyebrow}>
              IA DETECTOU
            </Text>
            <Text variant="sm" weight="bold" style={styles.iaText}>
              1 cavalo · área externa · luz da manhã. Sugestão de título: "{tipoLabel} de hoje".
            </Text>
          </View>
        </>
      )}

      <View style={styles.spacer} />
      <Button variant="primary" onPress={() => navigation.navigate('InformacoesRapidas')}>
        Continuar
      </Button>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: theme.spacing.xxl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  chipsRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    flex: 1,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  grid: {
    marginTop: theme.spacing.xl,
  },
  gridInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  thumb: {
    width: '23%',
    height: 70,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
    position: 'relative',
  },
  videoBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(43,41,36,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iaCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    padding: theme.cardPadding.max,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.sm,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.xl,
  },
});
