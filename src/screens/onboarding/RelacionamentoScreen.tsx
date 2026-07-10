import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SetupProgressBar } from '../../components/onboarding/SetupProgressBar';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Relacionamento'>;

const COMPETEM: { label: string; value: 'sim' | 'nao' }[] = [
  { label: 'Sim', value: 'sim' },
  { label: 'Não', value: 'nao' },
];

export function RelacionamentoScreen({ navigation }: Props) {
  const setRelationship = useHorseStore((state) => state.setRelationship);

  const [tempoJuntos, setTempoJuntos] = useState('');
  const [quemMonta, setQuemMonta] = useState('');
  const [competem, setCompetem] = useState<'sim' | 'nao' | null>(null);
  const [sonho, setSonho] = useState('');
  const [tempoSemana, setTempoSemana] = useState('');
  const [palavra, setPalavra] = useState('');

  function handleContinuar() {
    setRelationship({ tempoJuntos, quemMonta, competem, sonho, tempoSemana, palavra });
    navigation.navigate('Preferencias');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SetupProgressBar step={3} total={5} />

        <Pressable style={styles.skip} onPress={handleContinuar}>
          <Text variant="sm" weight="bold" color="secondary">
            Pular por enquanto
          </Text>
        </Pressable>

        <Text variant="xl" weight="extraBold">
          Sua parceria
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Essas respostas ajudam a IA a entender vocês dois.
        </Text>

        <View style={styles.fields}>
          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Há quanto tempo vocês estão juntos?
            </Text>
            <TextField placeholder="Ex: 2 anos" value={tempoJuntos} onChangeText={setTempoJuntos} />
          </View>

          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Quem monta normalmente?
            </Text>
            <TextField placeholder="Ex: eu e minha filha" value={quemMonta} onChangeText={setQuemMonta} />
          </View>

          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Vocês competem?
            </Text>
            <View style={styles.chips}>
              {COMPETEM.map((item) => (
                <Chip
                  key={item.value}
                  label={item.label}
                  selected={competem === item.value}
                  onPress={() => setCompetem(item.value)}
                />
              ))}
            </View>
          </View>

          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Qual é o maior sonho com esse cavalo?
            </Text>
            <TextField placeholder="Ex: competir juntos um dia" value={sonho} onChangeText={setSonho} />
          </View>

          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Quanto tempo passam juntos por semana?
            </Text>
            <TextField placeholder="Ex: 5 horas" value={tempoSemana} onChangeText={setTempoSemana} />
          </View>

          <View>
            <Text variant="xs" weight="bold" color="secondary" style={styles.label}>
              Descreva essa parceria em uma palavra
            </Text>
            <TextField placeholder="Ex: confiança" value={palavra} onChangeText={setPalavra} />
          </View>
        </View>

        <Button variant="primary" onPress={handleContinuar} style={styles.submit}>
          Continuar
        </Button>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  skip: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  fields: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  label: {
    marginBottom: theme.spacing.sm,
  },
  chips: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  submit: {
    marginTop: theme.spacing.xl,
  },
});
