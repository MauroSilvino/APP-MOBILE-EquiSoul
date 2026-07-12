import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Descricao'>;

const DESCRICAO_CHIPS = ['Primeiro salto', 'Primeira trilha', 'Nova conquista', 'Superação', 'Treino difícil', 'Dia inesquecível'];

export function DescricaoScreen({ navigation }: Props) {
  const descricao = useMemoriesStore((state) => state.criarMemoriaDraft.descricao);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  function adicionarSugestao(label: string) {
    setCriarMemoriaDraft({ descricao: descricao ? `${descricao} ${label}` : label });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <ProgressBar step={4} total={7} />
        <Text variant="xxl" weight="extraBold">
          Conte a história
        </Text>

        <TextField
          style={styles.textarea}
          value={descricao}
          onChangeText={(value) => setCriarMemoriaDraft({ descricao: value })}
          placeholder="O que tornou esse momento especial?"
          multiline
          numberOfLines={5}
        />
        <Text variant="xs" weight="medium" color={theme.colors.text.tertiary} style={styles.counter}>
          {descricao.length} caracteres
        </Text>

        <Text variant="xs" weight="medium" color={theme.colors.text.tertiary} style={styles.hint}>
          Toque em uma sugestão para adicionar à sua história.
        </Text>
        <View style={styles.chips}>
          {DESCRICAO_CHIPS.map((label) => (
            <Pressable key={label} style={styles.chip} onPress={() => adicionarSugestao(label)}>
              <Text variant="sm" weight="bold">
                + {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('Marcacao')}>
          <Text variant="lg" weight="extraBold">
            Continuar
          </Text>
        </Pressable>
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
  textarea: {
    marginTop: theme.spacing.lg,
    height: 130,
    paddingTop: theme.spacing.lg,
    textAlignVertical: 'top',
  },
  counter: {
    marginTop: theme.spacing.xs,
    textAlign: 'right',
  },
  hint: {
    marginTop: theme.spacing.sm,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  continueButton: {
    marginTop: theme.spacing.xl,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
