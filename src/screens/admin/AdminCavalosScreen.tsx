import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCavalos'>;

const PAGE_SIZE = 4;

export function AdminCavalosScreen({ navigation }: Props) {
  const cavalos = useAdminStore((s) => s.cavalos);
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);
  const visivelList = cavalos.slice(0, visiveis);
  const temMais = cavalos.length > visiveis;

  return (
    <AdminScreen
      title="Cavalos"
      activeRoute="AdminCavalos"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.list}>
        {visivelList.map((c) => (
          <Pressable key={c.id} style={styles.row} onPress={() => navigation.navigate('AdminCavaloDetalhe', { id: c.id })}>
            <ImagePlaceholder caption="" style={styles.avatar} />
            <View style={styles.rowTexts}>
              <Text variant="sm" weight="bold">
                {c.nome} · {c.raca}
              </Text>
              <Text variant="xs" weight="medium" color="secondary">
                Tutor: {c.usuario} · {c.pais}
              </Text>
            </View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              {c.eventos} ev.
            </Text>
          </Pressable>
        ))}
        {temMais && (
          <Pressable style={styles.loadMore} onPress={() => setVisiveis((v) => v + PAGE_SIZE)}>
            <Text variant="sm" weight="bold">
              Carregar mais
            </Text>
          </Pressable>
        )}
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
    gap: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
  },
  rowTexts: {
    flex: 1,
  },
  loadMore: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
