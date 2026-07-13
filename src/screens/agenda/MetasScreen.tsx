import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAgendaStore } from '../../store/useAgendaStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Metas'>;

export function MetasScreen({ navigation }: Props) {
  const metas = useAgendaStore((state) => state.metas);
  const addMeta = useAgendaStore((state) => state.addMeta);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [prazo, setPrazo] = useState('');

  function handleSalvar() {
    if (!titulo.trim()) return;
    addMeta({ titulo: titulo.trim(), prazo: prazo.trim() || 'sem prazo' });
    setTitulo('');
    setPrazo('');
    setAberto(false);
    show('Meta criada!');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
              <BackIcon size={16} />
            </Pressable>
            <Text variant="xxl" weight="extraBold">
              Metas
            </Text>
          </View>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Título da meta" value={titulo} onChangeText={setTitulo} />
            <TextField
              placeholder="Prazo (ex: até 30 jul)"
              value={prazo}
              onChangeText={setPrazo}
              style={styles.formField}
            />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar meta
              </Text>
            </Pressable>
          </View>
        )}

        {metas.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhuma meta criada ainda. Toque em "+" para adicionar a primeira.
          </Text>
        ) : (
          <View style={styles.lista}>
            {metas.map((meta) => (
              <View key={meta.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <Text variant="md" weight="bold">
                    {meta.titulo}
                  </Text>
                  <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather}>
                    {meta.prazo}
                  </Text>
                </View>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${meta.progresso}%` }]} />
                </View>
                <Text variant="xs" weight="semiBold" color="secondary" style={styles.progressoLabel}>
                  {meta.progresso}% concluído
                </Text>
              </View>
            ))}
          </View>
        )}
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    gap: theme.spacing.sm,
  },
  formField: {
    marginTop: 0,
  },
  salvarButton: {
    marginTop: theme.spacing.xs,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  track: {
    marginTop: theme.spacing.sm,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.06)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: theme.colors.accent.olive,
  },
  progressoLabel: {
    marginTop: 6,
  },
});
