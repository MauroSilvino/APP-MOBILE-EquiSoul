import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Recuperacao'>;

export function RecuperacaoScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));

  const acompanhamentos = useMemo(
    () =>
      (records?.lesoes ?? [])
        .filter((lesao) => lesao.situacao === 'em recuperação')
        .map((lesao) => ({
          titulo: `${lesao.tipo} · ${lesao.local}`,
          data: lesao.data,
        })),
    [records],
  );

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Recuperação
        </Text>

        {acompanhamentos.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum acompanhamento de recuperação no momento.
          </Text>
        ) : (
          <View style={styles.list}>
            {acompanhamentos.map((item, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.dotColumn}>
                  <View style={styles.dot} />
                  {index < acompanhamentos.length - 1 && <View style={styles.line} />}
                </View>
                <View style={styles.rowBody}>
                  <Text variant="sm" weight="bold">
                    {item.titulo}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.rowData}>
                    {item.data}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: 130,
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  list: {
    marginTop: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  dotColumn: {
    alignItems: 'center',
    flex: 0,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.olive,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.12)',
    marginVertical: 2,
  },
  rowBody: {
    paddingBottom: theme.spacing.lg,
    flex: 1,
  },
  rowData: {
    marginTop: 2,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
});
