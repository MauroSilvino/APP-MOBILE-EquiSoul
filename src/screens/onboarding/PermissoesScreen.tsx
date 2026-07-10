import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SetupProgressBar } from '../../components/onboarding/SetupProgressBar';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { UserPermissions, useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Permissoes'>;

interface PermissionRow {
  chave: keyof UserPermissions;
  label: string;
  desc: string;
}

const PERMISSOES: PermissionRow[] = [
  { chave: 'camera', label: 'Câmera', desc: 'Para fotos e vídeos do diário do seu cavalo.' },
  { chave: 'fotos', label: 'Fotos e vídeos', desc: 'Para anexar mídias já existentes na galeria.' },
  { chave: 'localizacao', label: 'Localização', desc: 'Para sugerir eventos e prestadores próximos.' },
  {
    chave: 'notificacoes',
    label: 'Notificações',
    desc: 'Para lembretes de cuidados e novidades da comunidade.',
  },
  { chave: 'calendario', label: 'Calendário', desc: 'Para sincronizar sua agenda de cuidados.' },
  { chave: 'microfone', label: 'Microfone', desc: 'Para gravar vídeos com áudio.' },
];

export function PermissoesScreen({ navigation }: Props) {
  const permissoes = useUserStore((state) => state.permissoes);
  const setPermissao = useUserStore((state) => state.setPermissao);

  const [, requestCameraPermission] = useCameraPermissions();
  const [, requestLocationPermission] = Location.useForegroundPermissions();

  async function handleToggle(chave: keyof UserPermissions) {
    const novoValor = !permissoes[chave];

    if (novoValor && chave === 'camera') {
      const result = await requestCameraPermission();
      setPermissao('camera', result.granted);
      return;
    }
    if (novoValor && chave === 'localizacao') {
      const result = await requestLocationPermission();
      setPermissao('localizacao', result.granted);
      return;
    }
    if (novoValor && chave === 'notificacoes') {
      const result = await Notifications.requestPermissionsAsync();
      setPermissao('notificacoes', result.granted);
      return;
    }

    setPermissao(chave, novoValor);
  }

  function irParaTour() {
    navigation.navigate('TourInteligente');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SetupProgressBar step={5} total={5} />

        <Pressable style={styles.skip} onPress={irParaTour}>
          <Text variant="sm" weight="bold" color="secondary">
            Pular
          </Text>
        </Pressable>

        <Text variant="xl" weight="extraBold">
          Permissões
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Só pedimos o que realmente ajuda sua experiência.
        </Text>

        <View style={styles.list}>
          {PERMISSOES.map((item) => (
            <View key={item.chave} style={styles.row}>
              <View style={styles.rowText}>
                <Text variant="md" weight="bold">
                  {item.label}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.rowDesc}>
                  {item.desc}
                </Text>
              </View>
              <Switch value={permissoes[item.chave]} onValueChange={() => handleToggle(item.chave)} />
            </View>
          ))}
        </View>

        <View style={styles.spacer} />

        <Button variant="primary" onPress={irParaTour}>
          Continuar
        </Button>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  skip: {
    alignSelf: 'flex-end',
    marginVertical: theme.spacing.sm,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowText: {
    flex: 1,
  },
  rowDesc: {
    marginTop: theme.spacing.xs / 2,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.lg,
  },
});
