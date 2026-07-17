import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { LegalSheet } from '../../components/ui/LegalSheet';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { ChevronRightIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Sobre'>;

const SOBRE_ITENS = [
  { label: 'Equipe', body: 'EquiSoul é feito por uma equipe pequena e apaixonada por cavalos e bem-estar animal.' },
  { label: 'Licenças', body: 'Bibliotecas de código aberto usadas no EquiSoul e seus respectivos termos de licença.' },
  { label: 'Termos de uso', body: 'Termos que regem o uso do aplicativo EquiSoul.' },
  { label: 'Política de privacidade', body: 'Como coletamos, usamos e protegemos seus dados.' },
  {
    label: 'Roadmap',
    body: 'Próximas novidades: comunidade de treinadores, integração com sensores e mais idiomas.',
  },
  { label: 'Atualizações', body: 'Histórico de versões e novidades de cada atualização do app.' },
];

export function SobreScreen({ navigation }: Props) {
  const [infoAberto, setInfoAberto] = useState<(typeof SOBRE_ITENS)[number] | null>(null);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Sobre" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.logoWrap}>
          <View style={styles.logo}>
            <Text variant="xl" weight="extraBold" color={theme.colors.accent.gold}>
              Eq
            </Text>
          </View>
          <Text variant="lg" weight="extraBold" style={styles.appName}>
            EquiSoul
          </Text>
          <Text variant="sm" weight="medium" color="secondary">
            Versão 3.4.1
          </Text>
        </View>

        <View style={styles.list}>
          {SOBRE_ITENS.map((item) => (
            <Pressable key={item.label} style={styles.row} onPress={() => setInfoAberto(item)}>
              <Text variant="sm" weight="bold" style={styles.rowLabel}>
                {item.label}
              </Text>
              <ChevronRightIcon size={16} color={theme.colors.text.tertiary} />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <LegalSheet visible={!!infoAberto} title={infoAberto?.label ?? ''} onClose={() => setInfoAberto(null)}>
        {infoAberto?.body}
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
  logoWrap: {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    marginTop: theme.spacing.md,
  },
  list: {
    marginTop: theme.spacing.xl,
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
