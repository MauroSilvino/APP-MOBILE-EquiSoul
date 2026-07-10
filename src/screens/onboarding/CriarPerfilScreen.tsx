import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SetupProgressBar } from '../../components/onboarding/SetupProgressBar';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CriarPerfil'>;

const MODALIDADES = ['Salto', 'Adestramento', 'Enduro', 'Volteio', 'Passeio', 'Vaquejada'];
const NIVEIS = ['Iniciante', 'Intermediário', 'Avançado'];

export function CriarPerfilScreen({ navigation }: Props) {
  const setProfile = useUserStore((state) => state.setProfile);

  const [nome, setNome] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [nivel, setNivel] = useState<string | null>(null);
  const [bio, setBio] = useState('');

  function handleContinuar() {
    setProfile({
      nome,
      cidade,
      estado,
      pais,
      modalidadePrincipal: modalidade,
      nivel,
      bio,
    });
    navigation.navigate('AdicionarCavalo');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SetupProgressBar step={1} total={5} />

        <Text variant="xl" weight="extraBold">
          Criar perfil
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Como podemos te chamar por aqui?
        </Text>

        <View style={styles.avatarRow}>
          <ImagePlaceholder caption="foto" style={styles.avatar} />
          <Text variant="sm" weight="semiBold" color={theme.colors.accent.leather}>
            Adicionar foto de perfil
          </Text>
        </View>

        <View style={styles.fields}>
          <TextField placeholder="Nome de exibição" value={nome} onChangeText={setNome} />
          <View style={styles.row}>
            <TextField
              placeholder="Cidade"
              value={cidade}
              onChangeText={setCidade}
              style={styles.flex1}
            />
            <TextField
              placeholder="Estado"
              value={estado}
              onChangeText={setEstado}
              style={styles.stateField}
            />
          </View>
          <TextField placeholder="País" value={pais} onChangeText={setPais} />
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MODALIDADE PRINCIPAL
        </Text>
        <View style={styles.chips}>
          {MODALIDADES.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={modalidade === label}
              onPress={() => setModalidade(label)}
            />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          NÍVEL DE EXPERIÊNCIA
        </Text>
        <View style={styles.chips}>
          {NIVEIS.map((label) => (
            <Chip key={label} label={label} selected={nivel === label} onPress={() => setNivel(label)} />
          ))}
        </View>

        <TextField
          placeholder="Biografia curta (opcional)"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.textarea}
        />

        <View style={styles.spacer} />

        <Button variant="primary" onPress={handleContinuar}>
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  avatarRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  fields: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
  stateField: {
    width: 88,
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
  spacer: {
    flex: 1,
    minHeight: theme.spacing.lg,
  },
});
