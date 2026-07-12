import { Screen } from '../components/ui/Screen';
import { Text } from '../components/ui/Text';
import { theme } from '../theme';

export function ComunidadeScreen() {
  return (
    <Screen>
      <Text variant="xl" weight="extraBold" style={{ marginTop: theme.spacing.xl }}>
        Comunidade
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={{ marginTop: theme.spacing.sm }}>
        Em breve.
      </Text>
    </Screen>
  );
}
