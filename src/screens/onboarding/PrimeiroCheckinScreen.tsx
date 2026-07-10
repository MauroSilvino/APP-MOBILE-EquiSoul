import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { CameraIcon } from '../../components/ui/icons';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useCheckinStore } from '../../store/useCheckinStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PrimeiroCheckin'>;

const HUMOR_CAVALO = ['Animado', 'Calmo', 'Cansado', 'Manhoso'];
const HUMOR_USUARIO = ['Feliz', 'Motivado(a)', 'Cansado(a)', 'Ansioso(a)', 'Grato(a)'];
const ATIVIDADES = ['Treino', 'Passeio', 'Descanso', 'Veterinário', 'Banho'];

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PrimeiroCheckinScreen({ navigation }: Props) {
  const setPrimeiroCheckin = useCheckinStore((state) => state.setPrimeiroCheckin);

  const [humorCavalo, setHumorCavalo] = useState<string | null>(null);
  const [humorUsuario, setHumorUsuario] = useState<string | null>(null);
  const [atividades, setAtividades] = useState<string[]>([]);
  const [fotoAnexada, setFotoAnexada] = useState(false);
  const [nota, setNota] = useState('');

  function handleConcluir() {
    setPrimeiroCheckin({
      humorCavalo,
      humorUsuario,
      atividades,
      fotoUri: fotoAnexada ? 'mock://checkin-foto' : null,
      nota,
    });
    navigation.navigate('PrimeiraCartaIA');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="xl" weight="extraBold">
          Seu primeiro registro
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Nada elaborado — só o suficiente para começar.
        </Text>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          COMO SEU CAVALO PARECE HOJE?
        </Text>
        <View style={styles.chips}>
          {HUMOR_CAVALO.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={humorCavalo === label}
              onPress={() => setHumorCavalo(label)}
            />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          COMO VOCÊ ESTÁ SE SENTINDO?
        </Text>
        <View style={styles.chips}>
          {HUMOR_USUARIO.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={humorUsuario === label}
              onPress={() => setHumorUsuario(label)}
            />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          O QUE PRETENDEM FAZER HOJE?
        </Text>
        <View style={styles.chips}>
          {ATIVIDADES.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={atividades.includes(label)}
              onPress={() => setAtividades((current) => toggleInArray(current, label))}
            />
          ))}
        </View>

        <Pressable
          style={[styles.fotoButton, fotoAnexada && styles.fotoButtonAtiva]}
          onPress={() => setFotoAnexada((current) => !current)}
        >
          <CameraIcon size={18} color={theme.colors.accent.leather} strokeWidth={1.8} />
          <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
            {fotoAnexada ? 'Foto anexada' : 'Adicionar uma foto'}
          </Text>
        </Pressable>

        <TextField
          placeholder="Adicionar uma observação (opcional)"
          value={nota}
          onChangeText={setNota}
          multiline
          numberOfLines={3}
          style={styles.textarea}
        />

        <Button variant="primary" onPress={handleConcluir} style={styles.submit}>
          Concluir check-in
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  fotoButton: {
    marginTop: theme.spacing.xl,
    height: 70,
    borderRadius: theme.radius.card,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(43,41,36,0.2)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
  },
  fotoButtonAtiva: {
    backgroundColor: 'rgba(107,115,83,0.08)',
    borderStyle: 'solid',
  },
  textarea: {
    marginTop: theme.spacing.md,
    height: 90,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
  },
  submit: {
    marginTop: theme.spacing.xl,
  },
});
