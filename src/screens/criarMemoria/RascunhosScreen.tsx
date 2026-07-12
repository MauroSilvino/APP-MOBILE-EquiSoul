import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Rascunhos'>;

export function RascunhosScreen({ navigation }: Props) {
  const rascunhos = useMemoriesStore((state) => state.rascunhos);
  const carregarRascunho = useMemoriesStore((state) => state.carregarRascunho);
  const removerRascunho = useMemoriesStore((state) => state.removerRascunho);

  function retomarEdicao(id: string) {
    carregarRascunho(id);
    navigation.navigate('Previa');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>

        <Text variant="xxl" weight="extraBold" style={styles.title}>
          Rascunhos
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Salvos automaticamente — sincronizados quando você estiver online.
        </Text>

        <View style={styles.list}>
          {rascunhos.map((rascunho) => (
            <View key={rascunho.id} style={styles.item}>
              <Pressable style={styles.thumb} onPress={() => retomarEdicao(rascunho.id)} />
              <Pressable style={styles.itemText} onPress={() => retomarEdicao(rascunho.id)}>
                <Text variant="md" weight="bold">
                  {rascunho.titulo}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.itemInfo}>
                  {rascunho.info}
                </Text>
              </Pressable>
              <Pressable style={styles.removeButton} onPress={() => removerRascunho(rascunho.id)}>
                <CloseIcon size={12} color={theme.colors.text.secondary} />
              </Pressable>
            </View>
          ))}

          {rascunhos.length === 0 && (
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
              Nenhum rascunho salvo.
            </Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    marginTop: theme.spacing.lg,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  itemText: {
    flex: 1,
    minWidth: 0,
  },
  itemInfo: {
    marginTop: 2,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
});
