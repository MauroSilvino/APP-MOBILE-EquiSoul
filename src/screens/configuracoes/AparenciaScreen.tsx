import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Tema, useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Aparencia'>;

const TEMAS: Tema[] = ['Claro', 'Escuro', 'Automático'];

const TEMAS_PREMIUM = [
  { nome: 'Outono', bg: '#C9A15A' },
  { nome: 'Campo', bg: '#8FA06B' },
  { nome: 'Madeira', bg: '#8A6E4B' },
  { nome: 'Couro', bg: '#6b4f36' },
  { nome: 'Minimal', bg: '#FBF9F4' },
  { nome: 'Natureza', bg: '#6B7353' },
  { nome: 'Noite', bg: '#2B2924' },
];

export function AparenciaScreen({ navigation }: Props) {
  const tema = useSettingsStore((state) => state.tema);
  const setTema = useSettingsStore((state) => state.setTema);
  const temaPremiumSel = useSettingsStore((state) => state.temaPremiumSel);
  const setTemaPremiumSel = useSettingsStore((state) => state.setTemaPremiumSel);
  const fontSizePct = useSettingsStore((state) => state.fontSizePct);
  const setFontSizePct = useSettingsStore((state) => state.setFontSizePct);
  const reduzirMovimento = useSettingsStore((state) => state.reduzirMovimento);
  const setReduzirMovimento = useSettingsStore((state) => state.setReduzirMovimento);

  const [trackWidth, setTrackWidth] = useState(1);

  function handleTrackLayout(e: LayoutChangeEvent) {
    setTrackWidth(e.nativeEvent.layout.width);
  }

  function handleTrackPress(e: GestureResponderEvent) {
    const pct = Math.round(Math.max(0, Math.min(1, e.nativeEvent.locationX / trackWidth)) * 100);
    setFontSizePct(pct);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Aparência" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.chips}>
          {TEMAS.map((t) => (
            <Chip key={t} label={t} selected={tema === t} onPress={() => setTema(t)} />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          TEMAS PREMIUM
        </Text>
        <View style={styles.temasGrid}>
          {TEMAS_PREMIUM.map((t) => (
            <Pressable
              key={t.nome}
              style={[styles.temaCard, temaPremiumSel === t.nome && styles.temaCardSelected]}
              onPress={() => setTemaPremiumSel(t.nome)}
            >
              <View style={[styles.temaSwatch, { backgroundColor: t.bg }]} />
              <Text variant="xs" weight="extraBold" style={styles.temaLabel}>
                {t.nome}
              </Text>
              <View style={styles.proBadge}>
                <Text variant="xs" weight="extraBold" color={theme.colors.accent.gold}>
                  PRO
                </Text>
              </View>
              {temaPremiumSel === t.nome && (
                <View style={styles.checkBadge}>
                  <CheckIcon size={10} />
                </View>
              )}
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          AJUSTES
        </Text>
        <View style={styles.ajustesList}>
          <View>
            <Text variant="sm" weight="semiBold">
              Tamanho da fonte
            </Text>
            <Pressable style={styles.fontTrack} onLayout={handleTrackLayout} onPress={handleTrackPress}>
              <View style={[styles.fontFill, { width: `${fontSizePct}%` }]} />
              <View style={[styles.fontKnob, { left: `${fontSizePct}%` }]} />
            </Pressable>
          </View>
          <View style={styles.toggleRow}>
            <Text variant="sm" weight="semiBold" style={styles.toggleLabel}>
              Reduzir movimento
            </Text>
            <Switch value={reduzirMovimento} onValueChange={setReduzirMovimento} />
          </View>
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
    paddingBottom: 40,
  },
  chips: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    letterSpacing: 0.4,
  },
  temasGrid: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  temaCard: {
    width: '31%',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(43,41,36,0.1)',
  },
  temaCardSelected: {
    borderColor: theme.colors.accent.moss,
  },
  temaSwatch: {
    height: 50,
  },
  temaLabel: {
    textAlign: 'center',
    paddingVertical: 6,
    backgroundColor: '#fff',
  },
  proBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: theme.colors.surfaceDark,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  checkBadge: {
    position: 'absolute',
    top: 5,
    left: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.accent.moss,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ajustesList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.lg,
  },
  fontTrack: {
    marginTop: theme.spacing.sm,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.1)',
  },
  fontFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.accent.gold,
  },
  fontKnob: {
    position: 'absolute',
    top: -6,
    marginLeft: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: theme.colors.accent.gold,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  toggleLabel: {
    flex: 1,
  },
});
