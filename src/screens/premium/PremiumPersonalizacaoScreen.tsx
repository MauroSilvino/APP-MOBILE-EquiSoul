import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ChevronRightIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumPersonalizacao'>;

export function PremiumPersonalizacaoScreen({ navigation }: Props) {
  const personalizacaoItens = usePremiumStore((state) => state.personalizacaoItens);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Personalização
        </Text>

        <View style={styles.list}>
          {personalizacaoItens.map((item, index) => (
            <View
              key={item}
              style={[styles.row, index < personalizacaoItens.length - 1 && styles.rowDivider]}
            >
              <Text variant="sm" weight="bold">
                {item}
              </Text>
              <ChevronRightIcon size={16} color={theme.colors.text.tertiary} />
            </View>
          ))}
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 13,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
});
