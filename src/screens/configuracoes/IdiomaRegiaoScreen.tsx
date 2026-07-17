import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CheckIcon, SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'IdiomaRegiao'>;

const IDIOMAS = ['Português (Brasil)', 'English (US)', 'Español', 'Français'];

const FORMATOS = [
  { label: 'Data', valor: 'DD/MM/AAAA' },
  { label: 'Sistema de medidas', valor: 'Métrico' },
  { label: 'Moeda', valor: 'R$ (BRL)' },
];

export function IdiomaRegiaoScreen({ navigation }: Props) {
  const idiomaSelecionado = useSettingsStore((state) => state.idiomaSelecionado);
  const setIdioma = useSettingsStore((state) => state.setIdioma);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Idioma e região" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.searchBox}>
          <SearchIcon size={16} color={theme.colors.text.secondary} />
          <Text variant="sm" weight="medium" color="tertiary">
            Buscar idioma
          </Text>
        </View>

        <View style={styles.list}>
          {IDIOMAS.map((nome) => (
            <Pressable key={nome} style={styles.row} onPress={() => setIdioma(nome)}>
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {nome}
              </Text>
              {idiomaSelecionado === nome && <CheckIcon size={16} color={theme.colors.accent.moss} />}
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          FORMATOS
        </Text>
        <View style={styles.formatosList}>
          {FORMATOS.map((f) => (
            <View key={f.label} style={styles.formatoRow}>
              <Text variant="sm" weight="semiBold">
                {f.label}
              </Text>
              <Text variant="sm" weight="semiBold" color="secondary">
                {f.valor}
              </Text>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  searchBox: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  list: {
    marginTop: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
  rowLabel: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    letterSpacing: 0.4,
  },
  formatosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  formatoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
