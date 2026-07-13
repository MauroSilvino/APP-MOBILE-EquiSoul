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

type Props = NativeStackScreenProps<RootStackParamList, 'Veterinarios'>;

const VETERINARIOS = [
  { nome: 'Dra. Camila Ferraz', especialidade: 'Clínica geral equina' },
  { nome: 'Dr. Rodrigo Sena', especialidade: 'Ortopedia e reabilitação' },
  { nome: 'Dra. Beatriz Nunes', especialidade: 'Odontologia equina' },
];

export function VeterinariosScreen({ navigation, route }: Props) {
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
          Veterinários
        </Text>

        <View style={styles.list}>
          {VETERINARIOS.map((vet) => (
            <View key={vet.nome} style={styles.card}>
              <View style={styles.avatar} />
              <View style={styles.cardBody}>
                <Text variant="sm" weight="bold">
                  {vet.nome}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                  {vet.especialidade}
                </Text>
              </View>
              <Pressable
                style={styles.agendarButton}
                onPress={() => show('Solicitação de agendamento enviada!')}
              >
                <Text variant="xs" weight="bold">
                  Agendar
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
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
    paddingBottom: 130,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardBody: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  agendarButton: {
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
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
});
