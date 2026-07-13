import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SetupProgressBar } from '../../components/onboarding/SetupProgressBar';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { BackIcon } from '../../components/ui/icons';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { HorseSex, useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdicionarCavalo'>;

const SEXOS: { label: string; value: HorseSex }[] = [
  { label: 'Macho', value: 'macho' },
  { label: 'Fêmea', value: 'femea' },
];
const PERSONALIDADES = ['Dócil', 'Enérgico', 'Curioso', 'Calmo', 'Teimoso', 'Brincalhão', 'Confiante'];
const MODALIDADES = ['Salto', 'Adestramento', 'Enduro', 'Volteio', 'Passeio', 'Vaquejada'];

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function AdicionarCavaloScreen({ navigation, route }: Props) {
  const fromPerfis = !!route.params?.fromPerfis;
  const setHorse = useHorseStore((state) => state.setHorse);
  const addHorse = useHorseStore((state) => state.addHorse);

  const [nome, setNome] = useState('');
  const [raca, setRaca] = useState('');
  const [pelagem, setPelagem] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [sexo, setSexo] = useState<HorseSex | null>(null);
  const [personalidade, setPersonalidade] = useState<string[]>([]);
  const [modalidades, setModalidades] = useState<string[]>([]);
  const [curiosidade, setCuriosidade] = useState('');

  function handleContinuar() {
    const dados = { nome, raca, pelagem, nascimento, sexo, personalidade, modalidades, curiosidade };
    if (fromPerfis) {
      addHorse(dados);
      navigation.navigate('Cavalos');
    } else {
      setHorse(dados);
      navigation.navigate('Relacionamento');
    }
  }

  function handlePular() {
    navigation.navigate('Relacionamento');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <ImagePlaceholder style={StyleSheet.absoluteFill} caption="foto grande · seu cavalo" />
          {fromPerfis ? (
            <Pressable style={styles.backButton} onPress={() => navigation.navigate('Cavalos')} hitSlop={8}>
              <BackIcon />
            </Pressable>
          ) : (
            <Pressable style={styles.skipButton} onPress={handlePular}>
              <Text variant="xs" weight="bold" color="inverse">
                Pular por enquanto
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.content}>
          {!fromPerfis && <SetupProgressBar step={2} total={5} />}

          <Text variant="xxl" weight="extraBold">
            {fromPerfis ? 'Adicionar cavalo' : 'Adicione seu primeiro cavalo'}
          </Text>
          <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
            {fromPerfis ? 'Conte um pouco sobre o novo integrante.' : 'Este é o começo da história de vocês dois.'}
          </Text>

          <View style={styles.fields}>
            <TextField placeholder="Nome do cavalo" value={nome} onChangeText={setNome} />
            <TextField placeholder="Raça" value={raca} onChangeText={setRaca} />
            <TextField placeholder="Pelagem" value={pelagem} onChangeText={setPelagem} />
            <View>
              <Text variant="xs" weight="bold" color="secondary" style={styles.dateLabel}>
                Data de nascimento (aproximada)
              </Text>
              <TextField
                placeholder="AAAA-MM-DD"
                value={nascimento}
                onChangeText={setNascimento}
                keyboardType="numbers-and-punctuation"
              />
            </View>
          </View>

          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            SEXO
          </Text>
          <View style={styles.chips}>
            {SEXOS.map((item) => (
              <Chip
                key={item.value}
                label={item.label}
                selected={sexo === item.value}
                onPress={() => setSexo(item.value)}
              />
            ))}
          </View>

          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            PERSONALIDADE
          </Text>
          <View style={styles.chips}>
            {PERSONALIDADES.map((label) => (
              <Chip
                key={label}
                label={label}
                selected={personalidade.includes(label)}
                onPress={() => setPersonalidade((current) => toggleInArray(current, label))}
              />
            ))}
          </View>

          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            MODALIDADE PRATICADA
          </Text>
          <View style={styles.chips}>
            {MODALIDADES.map((label) => (
              <Chip
                key={label}
                label={label}
                selected={modalidades.includes(label)}
                onPress={() => setModalidades((current) => toggleInArray(current, label))}
              />
            ))}
          </View>

          <TextField
            placeholder="Uma curiosidade ou história sobre o cavalo (opcional)"
            value={curiosidade}
            onChangeText={setCuriosidade}
            multiline
            numberOfLines={3}
            style={styles.textarea}
          />

          <Button variant="primary" onPress={handleContinuar} style={styles.submit}>
            Continuar
          </Button>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hero: {
    height: 220,
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    left: theme.spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.35)',
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  fields: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  dateLabel: {
    marginBottom: theme.spacing.xs,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  textarea: {
    marginTop: theme.spacing.lg,
    height: 90,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
  },
  submit: {
    marginTop: theme.spacing.xl,
  },
});
