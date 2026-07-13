import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceFavoritos'>;

export function MarketplaceFavoritosScreen({ navigation }: Props) {
  return (
    <Screen>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>
      <Text variant="xl" weight="extraBold" style={styles.title}>
        Favoritos
      </Text>
      <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
        Em breve.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  title: {
    marginTop: theme.spacing.lg,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
});
