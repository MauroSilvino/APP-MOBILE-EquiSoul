import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { CommunityIcon, DiaryIcon, HomeIcon, PlusIcon, ProfileIcon } from '../ui/icons';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

type Tab = 'Home' | 'Timeline' | 'Comunidade' | 'Perfis';

interface BottomTabBarProps {
  active: Tab;
}

const MUTED = 'rgba(247,243,236,0.5)';
const GOLD = '#C9A15A';

export function BottomTabBar({ active }: BottomTabBarProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.bar}>
      <Pressable onPress={() => navigation.navigate('Home')} hitSlop={8}>
        <HomeIcon color={active === 'Home' ? GOLD : MUTED} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Timeline')} hitSlop={8}>
        <DiaryIcon color={active === 'Timeline' ? GOLD : MUTED} />
      </Pressable>
      <Pressable style={styles.fab} onPress={() => navigation.navigate('NovoRegistro')}>
        <PlusIcon />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Comunidade')} hitSlop={8}>
        <CommunityIcon color={active === 'Comunidade' ? GOLD : MUTED} />
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Perfis')} hitSlop={8}>
        <ProfileIcon color={active === 'Perfis' ? GOLD : MUTED} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.surfaceDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 30,
    elevation: 8,
  },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
