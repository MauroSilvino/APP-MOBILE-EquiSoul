import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { LocationIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'InformacoesRapidas'>;

const DIA_OPTIONS = [
  { emoji: '😊', label: 'Excelente' },
  { emoji: '🙂', label: 'Muito bom' },
  { emoji: '😐', label: 'Normal' },
  { emoji: '😓', label: 'Difícil' },
  { emoji: '😔', label: 'Cansativo' },
];

const CAVALO_HUMOR_OPTIONS = [
  { emoji: '😄', label: 'Feliz' },
  { emoji: '😌', label: 'Relaxado' },
  { emoji: '🔥', label: 'Energético' },
  { emoji: '😴', label: 'Sonolento' },
  { emoji: '🤍', label: 'Carinhoso' },
  { emoji: '😬', label: 'Inseguro' },
];

const USUARIO_HUMOR_OPTIONS = [
  { emoji: '😊', label: 'Feliz' },
  { emoji: '😌', label: 'Tranquilo' },
  { emoji: '😅', label: 'Ansioso' },
  { emoji: '🏆', label: 'Motivado' },
  { emoji: '😴', label: 'Cansado' },
];

const INTENSIDADE_OPTIONS = ['Leve', 'Moderada', 'Intensa'];
const DURACAO_OPTIONS = [15, 30, 45, 60, 90, 120];
const LOCAIS_RECENTES = ['Haras Bela Vista', 'Parque do Vale', 'Sítio da Serra'];

function EmojiChipRow({
  options,
  selected,
  onSelect,
}: {
  options: { emoji: string; label: string }[];
  selected: string | null;
  onSelect: (label: string) => void;
}) {
  return (
    <View style={styles.chips}>
      {options.map((option) => {
        const isSelected = selected === option.label;
        return (
          <Pressable
            key={option.label}
            style={[styles.emojiChip, isSelected && styles.emojiChipSelected]}
            onPress={() => onSelect(option.label)}
          >
            <Text variant="sm" weight="bold" color={isSelected ? theme.colors.accent.gold : 'primary'}>
              {option.emoji} {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function InformacoesRapidasScreen({ navigation }: Props) {
  const draft = useMemoriesStore((state) => state.criarMemoriaDraft);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  async function usarGps() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') return;

    const position = await Location.getCurrentPositionAsync({});
    const [place] = await Location.reverseGeocodeAsync(position.coords);
    const label = place
      ? [place.name || place.street, place.city].filter(Boolean).join(', ')
      : `${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)}`;
    setCriarMemoriaDraft({ local: label });
  }

  function continuar() {
    navigation.navigate('Descricao');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <ProgressBar step={3} total={7} />
      <Text variant="xl" weight="extraBold">
        Perguntas rápidas
      </Text>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        COMO FOI O DIA?
      </Text>
      <EmojiChipRow
        options={DIA_OPTIONS}
        selected={draft.dia}
        onSelect={(label) => setCriarMemoriaDraft({ dia: label })}
      />

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        COMO PARECIA SEU CAVALO?
      </Text>
      <EmojiChipRow
        options={CAVALO_HUMOR_OPTIONS}
        selected={draft.cavaloHumor}
        onSelect={(label) => setCriarMemoriaDraft({ cavaloHumor: label })}
      />

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        COMO VOCÊ ESTAVA?
      </Text>
      <EmojiChipRow
        options={USUARIO_HUMOR_OPTIONS}
        selected={draft.usuarioHumor}
        onSelect={(label) => setCriarMemoriaDraft({ usuarioHumor: label })}
      />

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        INTENSIDADE
      </Text>
      <View style={styles.chips}>
        {INTENSIDADE_OPTIONS.map((label) => (
          <Chip
            key={label}
            label={label}
            selected={draft.intensidade === label}
            onPress={() => setCriarMemoriaDraft({ intensidade: label })}
          />
        ))}
      </View>

      <View style={styles.durationRow}>
        <Text variant="xs" weight="bold" style={styles.sectionLabelInline}>
          DURAÇÃO
        </Text>
        <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
          {draft.duracao} min
        </Text>
      </View>
      <View style={styles.chips}>
        {DURACAO_OPTIONS.map((minutos) => (
          <Chip
            key={minutos}
            label={`${minutos} min`}
            selected={draft.duracao === minutos}
            onPress={() => setCriarMemoriaDraft({ duracao: minutos })}
          />
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        LOCAL
      </Text>
      <View style={styles.localBox}>
        <LocationIcon />
        <TextField
          style={styles.localInput}
          value={draft.local}
          onChangeText={(local) => setCriarMemoriaDraft({ local })}
          placeholder="Usar GPS ou digitar local"
        />
        <Pressable onPress={usarGps}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
            usar GPS
          </Text>
        </Pressable>
      </View>
      <View style={styles.recentChips}>
        {LOCAIS_RECENTES.map((nome) => (
          <Pressable key={nome} style={styles.recentChip} onPress={() => setCriarMemoriaDraft({ local: nome })}>
            <Text variant="xs" weight="semiBold" color="secondary">
              📍 {nome}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.continueButton} onPress={continuar}>
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
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionLabelInline: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  emojiChip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  emojiChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  durationRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  localBox: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    height: 52,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(43,41,36,0.12)',
    paddingHorizontal: theme.spacing.lg,
  },
  localInput: {
    flex: 1,
    height: 44,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  recentChips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  recentChip: {
    paddingVertical: 7,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
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
