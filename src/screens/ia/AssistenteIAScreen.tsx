import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { BackIcon, SendIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { FREE_QUESTIONS_LIMIT, useAIStore } from '../../store/useAIStore';
import { useUserStore } from '../../store/useUserStore';
import { mockAIService } from '../../services/aiService';

type Props = NativeStackScreenProps<RootStackParamList, 'AssistenteIA'>;

const PERGUNTAS_SUGERIDAS = [
  'Como evoluímos este mês?',
  'Qual foi nosso momento mais marcante?',
  'Quais memórias você recomenda rever?',
  'Existe algum padrão interessante?',
  'Quais foram nossos maiores desafios?',
  'Crie uma retrospectiva da nossa história.',
];

export function AssistenteIAScreen({ navigation }: Props) {
  const premium = useUserStore((state) => state.premium);
  const mensagens = useAIStore((state) => state.mensagens);
  const perguntasUsadas = useAIStore((state) => state.perguntasUsadas);
  const addMensagem = useAIStore((state) => state.addMensagem);
  const incrementarPerguntasUsadas = useAIStore((state) => state.incrementarPerguntasUsadas);

  const [input, setInput] = useState('');
  const [digitando, setDigitando] = useState(false);

  const limiteLabel = premium
    ? 'Premium · perguntas ilimitadas'
    : `${perguntasUsadas}/${FREE_QUESTIONS_LIMIT} perguntas gratuitas este mês`;

  async function perguntar(pergunta: string) {
    if (!premium && perguntasUsadas >= FREE_QUESTIONS_LIMIT) {
      addMensagem({ id: `msg-${Date.now()}`, role: 'user', texto: pergunta });
      addMensagem({
        id: `msg-${Date.now() + 1}`,
        role: 'ai',
        texto: 'Você atingiu o limite gratuito de perguntas este mês. Assine o Premium para perguntas ilimitadas.',
      });
      return;
    }
    addMensagem({ id: `msg-${Date.now()}`, role: 'user', texto: pergunta });
    incrementarPerguntasUsadas();
    setDigitando(true);
    const response = await mockAIService.askAssistant({ pergunta });
    setDigitando(false);
    addMensagem({ id: `msg-${Date.now() + 1}`, role: 'ai', texto: response.resposta });
  }

  function enviar() {
    const texto = input.trim();
    if (!texto) return;
    setInput('');
    perguntar(texto);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
          <BackIcon />
        </Pressable>
        <View style={styles.header}>
          <Text variant="lg" weight="extraBold">
            Assistente
          </Text>
          <Text variant="xs" weight="bold" color="secondary">
            {limiteLabel}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.messages}>
          {mensagens.length === 0 && !digitando && (
            <Text variant="sm" weight="medium" color="secondary" style={styles.vazioTexto}>
              Pergunte algo sobre a jornada de vocês — o assistente responde com base no seu diário.
            </Text>
          )}
          {mensagens.map((mensagem) => (
            <View
              key={mensagem.id}
              style={[
                styles.bubble,
                mensagem.role === 'user' ? styles.bubbleUser : styles.bubbleAi,
              ]}
            >
              <Text variant="sm" weight="semiBold" color={mensagem.role === 'user' ? 'primary' : 'inverse'}>
                {mensagem.texto}
              </Text>
            </View>
          ))}
          {digitando && (
            <View style={[styles.bubble, styles.bubbleAi, styles.bubbleDigitando]}>
              <ActivityIndicator size="small" color={theme.colors.accent.gold} />
            </View>
          )}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sugestoes}>
          {PERGUNTAS_SUGERIDAS.map((texto) => (
            <Pressable key={texto} style={styles.sugestaoChip} onPress={() => perguntar(texto)}>
              <Text variant="xs" weight="semiBold">
                {texto}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextField
            value={input}
            onChangeText={setInput}
            placeholder="Escreva sua pergunta…"
            onSubmitEditing={enviar}
            style={styles.input}
          />
          <Pressable style={styles.sendButton} onPress={enviar}>
            <SendIcon />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: theme.spacing.xl,
    paddingLeft: 66,
  },
  messages: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  vazioTexto: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    lineHeight: 20,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 18,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.accent.gold,
  },
  bubbleAi: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.surfaceDark,
  },
  bubbleDigitando: {
    paddingVertical: theme.spacing.sm,
  },
  sugestoes: {
    paddingVertical: theme.spacing.md,
  },
  sugestaoChip: {
    marginLeft: theme.spacing.xl,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  input: {
    flex: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
