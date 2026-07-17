import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { SettingsToggleRow } from '../../components/configuracoes/SettingsToggleRow';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PrivacidadeConfig, useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfiguracoesPrivacidade'>;

const TOGGLE_DEFS: { key: keyof PrivacidadeConfig; label: string; desc: string }[] = [
  { key: 'perfilPublico', label: 'Perfil público', desc: 'Outros cavaleiros podem encontrar seu perfil.' },
  { key: 'mostrarCidade', label: 'Mostrar cidade', desc: 'Exibe sua cidade no perfil público.' },
  { key: 'mostrarEstatisticas', label: 'Mostrar estatísticas', desc: 'Conquistas e níveis visíveis para outros.' },
  { key: 'mostrarTimeline', label: 'Mostrar timeline', desc: 'Sua linha do tempo fica visível publicamente.' },
  { key: 'permitirSeguidores', label: 'Permitir seguidores', desc: 'Outras pessoas podem seguir seu perfil.' },
  { key: 'permitirMensagens', label: 'Permitir mensagens', desc: 'Receber mensagens diretas de outros usuários.' },
  {
    key: 'permitirDownload',
    label: 'Permitir download das minhas fotos',
    desc: 'Outros podem salvar fotos que você publica.',
  },
  {
    key: 'iaConteudoPrivado',
    label: 'IA usar conteúdo privado',
    desc: 'Permite que a IA personalize sugestões com conteúdo privado.',
  },
];

export function ConfiguracoesPrivacidadeScreen({ navigation }: Props) {
  const privacidade = useSettingsStore((state) => state.privacidade);
  const togglePrivacidade = useSettingsStore((state) => state.togglePrivacidade);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Privacidade" onBack={() => navigation.navigate('Configuracoes')} />
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Suas memórias pertencem a você. Você decide o que é visível.
        </Text>

        <View style={styles.list}>
          {TOGGLE_DEFS.map((t) => (
            <SettingsToggleRow
              key={t.key}
              label={t.label}
              description={t.desc}
              value={privacidade[t.key]}
              onValueChange={() => togglePrivacidade(t.key)}
            />
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
  },
});
