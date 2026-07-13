import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Switch } from '../../components/ui/Switch';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { TipoCompromisso, hojeISO, useAgendaStore } from '../../store/useAgendaStore';
import { useHorseStore } from '../../store/useHorseStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CriarCompromisso'>;

const TIPOS: TipoCompromisso[] = ['Treino', 'Passeio', 'Consulta', 'Evento', 'Ferrageamento', 'Competição', 'Outro'];

function isoParaBR(iso: string): string {
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

function brParaIso(br: string): string {
  const match = br.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return hojeISO();
  const dia = match[1].padStart(2, '0');
  const mes = match[2].padStart(2, '0');
  const ano = match[3].length === 2 ? `20${match[3]}` : match[3];
  return `${ano}-${mes}-${dia}`;
}

function normalizaHora(texto: string): string {
  const match = texto.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return '09:00';
  return `${match[1].padStart(2, '0')}:${match[2]}`;
}

export function CriarCompromissoScreen({ navigation, route }: Props) {
  const addCompromisso = useAgendaStore((state) => state.addCompromisso);
  const horses = useHorseStore((state) => state.horses);
  const permissoes = useUserStore((state) => state.permissoes);
  const setPermissao = useUserStore((state) => state.setPermissao);
  const { message, show } = useToast();

  const [tipo, setTipo] = useState<TipoCompromisso>(route.params?.tipoInicial ?? 'Treino');
  const [titulo, setTitulo] = useState('');
  const [dataTexto, setDataTexto] = useState(isoParaBR(route.params?.data ?? hojeISO()));
  const [horaTexto, setHoraTexto] = useState('09:00');
  const [local, setLocal] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [cavaloId, setCavaloId] = useState<string | null>(horses[0]?.id ?? null);
  const [mostrarCavalos, setMostrarCavalos] = useState(false);
  const [lembrete, setLembrete] = useState(false);

  const cavaloSelecionado = horses.find((h) => h.id === cavaloId);

  async function handleToggleLembrete(valor: boolean) {
    if (valor && !permissoes.notificacoes) {
      const result = await Notifications.requestPermissionsAsync();
      setPermissao('notificacoes', result.granted);
    }
    setLembrete(valor);
  }

  async function handleSalvar() {
    if (!titulo.trim()) return;

    const data = brParaIso(dataTexto);
    const hora = normalizaHora(horaTexto);

    addCompromisso({
      titulo: titulo.trim(),
      tipo,
      data,
      hora,
      local: local.trim() || 'A definir',
      cavaloId,
      observacoes: observacoes.trim(),
      lembrete,
    });

    let lembreteAgendado = false;
    if (lembrete && permissoes.notificacoes) {
      const [ano, mes, dia] = data.split('-').map(Number);
      const [h, m] = hora.split(':').map(Number);
      const disparo = new Date(ano, (mes ?? 1) - 1, dia ?? 1, h || 0, m || 0);
      if (disparo.getTime() > Date.now()) {
        try {
          await Notifications.scheduleNotificationAsync({
            content: { title: titulo.trim(), body: `Compromisso em ${local.trim() || 'sua agenda'} às ${hora}` },
            trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: disparo },
          });
          lembreteAgendado = true;
        } catch {
          lembreteAgendado = false;
        }
      }
    }

    show(lembreteAgendado ? 'Compromisso salvo · lembrete agendado' : 'Compromisso salvo!');
    navigation.navigate('AgendaDashboard');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Novo compromisso
          </Text>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          TIPO
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {TIPOS.map((label) => {
            const selected = tipo === label;
            return (
              <Pressable
                key={label}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setTipo(label)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.form}>
          <TextField placeholder="Título" value={titulo} onChangeText={setTitulo} />
          <View style={styles.row}>
            <TextField
              placeholder="Data"
              value={dataTexto}
              onChangeText={setDataTexto}
              style={styles.rowField}
            />
            <TextField
              placeholder="Hora"
              value={horaTexto}
              onChangeText={setHoraTexto}
              style={styles.rowField}
            />
          </View>
          <TextField placeholder="Local" value={local} onChangeText={setLocal} />

          {horses.length > 0 && (
            <>
              <Pressable style={styles.cavaloPicker} onPress={() => setMostrarCavalos((current) => !current)}>
                <View style={styles.cavaloAvatar} />
                <Text variant="md" weight="bold" style={styles.cavaloNome}>
                  {cavaloSelecionado?.nome ?? 'Selecionar cavalo'}
                </Text>
              </Pressable>
              {mostrarCavalos && (
                <View style={styles.cavaloOptions}>
                  {horses.map((h) => {
                    const selected = cavaloId === h.id;
                    return (
                      <Pressable
                        key={h.id}
                        style={[styles.cavaloChip, selected && styles.chipSelected]}
                        onPress={() => {
                          setCavaloId(h.id);
                          setMostrarCavalos(false);
                        }}
                      >
                        <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                          {h.nome}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </>
          )}

          <TextField
            placeholder="Observações"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            numberOfLines={3}
            style={styles.textarea}
          />

          <View style={styles.lembreteRow}>
            <View style={styles.lembreteText}>
              <Text variant="md" weight="bold">
                Lembrete
              </Text>
              <Text variant="sm" weight="medium" color="secondary">
                Receber notificação no horário do compromisso.
              </Text>
            </View>
            <Switch value={lembrete} onValueChange={handleToggleLembrete} />
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text variant="sm" weight="extraBold">
              Cancelar
            </Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={handleSalvar}>
            <Text variant="sm" weight="extraBold">
              Salvar compromisso
            </Text>
          </Pressable>
        </View>
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
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsRow: {
    marginTop: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
    marginRight: theme.spacing.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  form: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  rowField: {
    flex: 1,
  },
  cavaloPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    padding: theme.cardPadding.min,
  },
  cavaloAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.placeholder.background,
  },
  cavaloNome: {
    flex: 1,
  },
  cavaloOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    paddingLeft: 4,
  },
  cavaloChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  textarea: {
    height: 84,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  lembreteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  lembreteText: {
    flex: 1,
  },
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  cancelButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    flex: 1.4,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
