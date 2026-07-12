import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { BackIcon } from '../../components/ui/icons';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'NovoRegistro'>;

export function NovoRegistroScreen({ navigation, route }: Props) {
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  useEffect(() => {
    if (route.params?.tipoInicial) {
      setCriarMemoriaDraft({ tipo: route.params.tipoInicial });
    }
  }, [route.params?.tipoInicial, setCriarMemoriaDraft]);

  return (
    <Screen style={styles.screen} padded={false}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <BackIcon />
      </Pressable>
      <View style={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Novo registro
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Rápido — vamos guiar você em poucos passos para registrar esse momento.
        </Text>

        <View style={styles.spacer} />

        <Button variant="primary" onPress={() => navigation.navigate('TipoMemoria')}>
          Começar
        </Button>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  back: {
    marginTop: theme.spacing.xl,
    marginLeft: theme.spacing.xl,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.xl,
  },
});
