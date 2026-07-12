import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Comparacao'>;

const FALLBACK_OPTIONS = ['Primeiro salto', 'Salto intermediário', 'Último salto', 'Treino de hoje'];

function CompareChips({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (label: string) => void;
}) {
  return (
    <View style={styles.chips}>
      {options.map((label) => {
        const isSelected = selected === label;
        return (
          <Pressable
            key={label}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(label)}
          >
            <Text variant="sm" weight="bold" color={isSelected ? theme.colors.accent.gold : 'primary'}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ComparacaoScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const { message, show } = useToast();

  const options = useMemo(() => {
    const titulos = memorias.map((memoria) => memoria.titulo);
    return titulos.length >= 2 ? titulos.slice(0, 4) : FALLBACK_OPTIONS;
  }, [memorias]);

  const [compareA, setCompareA] = useState(options[0]);
  const [compareB, setCompareB] = useState(options[1] ?? options[0]);

  const compareInsight = `Entre "${compareA}" e "${compareB}", a altura média aumentou e a postura ficou muito mais confiante.`;

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>

        <Text variant="xxl" weight="extraBold" style={styles.title}>
          Comparação
        </Text>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MEMÓRIA A
        </Text>
        <CompareChips options={options} selected={compareA} onSelect={setCompareA} />

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MEMÓRIA B
        </Text>
        <CompareChips options={options} selected={compareB} onSelect={setCompareB} />

        <View style={styles.photosRow}>
          <ImagePlaceholder style={styles.photo} caption={`foto · ${compareA}`} />
          <ImagePlaceholder style={styles.photo} caption={`foto · ${compareB}`} />
        </View>

        <View style={styles.iaCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.iaEyebrow}>
            IA
          </Text>
          <Text variant="sm" weight="bold" color="inverse" style={styles.iaText}>
            {compareInsight}
          </Text>
        </View>

        <Pressable style={styles.videoButton} onPress={() => show('Em breve.')}>
          <Text variant="md" weight="extraBold">
            Ver vídeo lado a lado
          </Text>
        </Pressable>
      </ScrollView>

      <Toast message={message} />
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
  chip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 13,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  photosRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  photo: {
    flex: 1,
    height: 150,
    borderRadius: theme.radius.card,
    overflow: 'hidden',
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    padding: theme.cardPadding.max,
    backgroundColor: theme.colors.surfaceDark,
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.xs,
  },
  videoButton: {
    marginTop: theme.spacing.lg,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
