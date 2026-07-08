import { Screen } from '../components/ui/Screen';
import { Text } from '../components/ui/Text';

export function HomeScreen() {
  return (
    <Screen>
      <Text variant="xl" weight="bold">
        EquiSoul
      </Text>
      <Text variant="md" color="secondary">
        Tela placeholder — será substituída pelas telas sincronizadas do Claude Design.
      </Text>
    </Screen>
  );
}
