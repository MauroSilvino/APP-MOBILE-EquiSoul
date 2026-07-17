import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { LegalSheet } from '../../components/ui/LegalSheet';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ModoDesenvolvedor'>;

const DEV_ITENS = [
  { label: 'Logs de sincronização', status: 'Ativado', color: theme.colors.accent.moss },
  { label: 'Modo debug', status: 'Desativado', color: theme.colors.text.tertiary },
  { label: 'Status da API', status: 'Operacional', color: theme.colors.accent.moss },
  {
    label: 'Diagnóstico do app',
    status: 'Ver relatório',
    color: theme.colors.accent.leather,
    body: 'Tudo operacional. Última sincronização há 3 minutos. Cache: 42MB. Nenhum erro reportado nas últimas 24h.',
  },
];

export function ModoDesenvolvedorScreen({ navigation }: Props) {
  const [diagnosticoAberto, setDiagnosticoAberto] = useState(false);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Modo desenvolvedor" onBack={() => navigation.navigate('Configuracoes')} />
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Disponível apenas quando habilitado manualmente.
        </Text>

        <View style={styles.list}>
          {DEV_ITENS.map((item) => (
            <Pressable
              key={item.label}
              style={styles.row}
              onPress={() => item.body && setDiagnosticoAberto(true)}
              disabled={!item.body}
            >
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {item.label}
              </Text>
              <Text variant="sm" weight="bold" color={item.color}>
                {item.status}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <LegalSheet visible={diagnosticoAberto} title="Diagnóstico do app" onClose={() => setDiagnosticoAberto(false)}>
        {DEV_ITENS[3].body}
      </LegalSheet>
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
});
