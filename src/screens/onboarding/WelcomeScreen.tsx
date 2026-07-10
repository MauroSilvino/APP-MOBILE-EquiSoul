import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <ImagePlaceholder style={styles.photo} caption="foto · cavalo e cavaleira ao pôr do sol" />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text variant="xxl" weight="extraBold">
          Cada cavalo tem uma história.
        </Text>
        <Text variant="lg" weight="semiBold" color="secondary" style={styles.subtitle}>
          E toda parceria merece ser lembrada.
        </Text>
        <View style={styles.spacer} />
        <Button variant="primary" onPress={() => navigation.navigate('Storytelling')}>
          Começar
        </Button>
        <View style={{ height: theme.spacing.md }} />
        <Button variant="secondary" onPress={() => navigation.navigate('Login')}>
          Já tenho conta
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  photo: {
    height: '55%',
  },
  sheet: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.cardLarge,
    borderTopRightRadius: theme.radius.cardLarge,
    marginTop: -theme.radius.cardLarge,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  handle: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  spacer: {
    flex: 1,
  },
});
