import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';
import { CompassIcon } from '../../components/ui/icons';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export function SplashScreen({ navigation }: Props) {
  return (
    <Pressable style={styles.container} onPress={() => navigation.replace('Welcome')}>
      <LinearGradient
        colors={['rgba(43,41,36,0.1)', 'rgba(43,41,36,0.6)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <View style={styles.mark}>
          <CompassIcon size={24} color={theme.colors.text.inverse} />
        </View>
        <Text variant="xxl" weight="extraBold" color="inverse">
          EquiSoul
        </Text>
      </View>
      <Text variant="xs" weight="semiBold" color="rgba(251,249,244,0.7)" style={styles.caption}>
        foto · campo ao amanhecer, cavalo e cavaleiro em silhueta
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.placeholder.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
  },
  mark: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.6,
    borderColor: theme.colors.text.inverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    position: 'absolute',
    bottom: 56,
    left: 0,
    right: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    paddingHorizontal: 30,
  },
});
