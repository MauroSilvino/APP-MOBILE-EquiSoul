import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../ui/Chip';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';

export type CommunityTab = 'Feed' | 'Explorar' | 'Eventos' | 'Grupos' | 'Mensagens';

const TABS: { label: CommunityTab; route: keyof RootStackParamList }[] = [
  { label: 'Feed', route: 'Comunidade' },
  { label: 'Explorar', route: 'Explorar' },
  { label: 'Eventos', route: 'Eventos' },
  { label: 'Grupos', route: 'Grupos' },
  { label: 'Mensagens', route: 'Mensagens' },
];

interface CommunityTabsProps {
  active: CommunityTab;
}

export function CommunityTabs({ active }: CommunityTabsProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {TABS.map((tab) => (
          <Chip
            key={tab.label}
            label={tab.label}
            selected={active === tab.label}
            onPress={() => navigation.navigate(tab.route as never)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
});
