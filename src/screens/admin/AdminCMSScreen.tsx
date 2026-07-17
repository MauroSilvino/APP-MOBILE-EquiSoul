import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCMS'>;

export function AdminCMSScreen({ navigation }: Props) {
  const cmsList = useAdminStore((s) => s.cmsList);

  return (
    <AdminScreen
      title="CMS"
      activeRoute="AdminCMS"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.list}>
        {cmsList.map((c) => (
          <Pressable key={c.id} style={styles.row} onPress={() => navigation.navigate('AdminCmsEditor', { id: c.id })}>
            <Text variant="sm" weight="bold">
              {c.label}
            </Text>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              {c.count}
            </Text>
          </Pressable>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
});
