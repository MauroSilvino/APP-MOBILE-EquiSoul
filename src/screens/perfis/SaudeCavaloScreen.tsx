import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'SaudeCavalo'>;

export function SaudeCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const { message, show } = useToast();

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Saúde · {horse.nome}
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Organização de cuidados — nunca substitui seu veterinário.
        </Text>

        <View style={styles.emptyCard}>
          <Text variant="md" weight="bold">
            Nenhum registro de saúde ainda
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.emptySubtitle}>
            Adicione vacinas, casqueamento e outros cuidados de {horse.nome}.
          </Text>
          <Pressable style={styles.emptyButton} onPress={() => show('Registro de saúde adicionado!')}>
            <Text variant="sm" weight="extraBold">
              Adicionar registro
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
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
    paddingBottom: 150,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  emptyCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptySubtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
    height: 44,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
});
