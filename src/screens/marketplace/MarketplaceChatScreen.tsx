import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, SendIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { ChatMensagem, useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceChat'>;

const SEM_MENSAGENS: ChatMensagem[] = [];

export function MarketplaceChatScreen({ navigation, route }: Props) {
  const nome = route.params?.nome ?? 'Vendedor';
  const [texto, setTexto] = useState('');
  const mensagens = useMarketplaceStore((state) => state.chatMensagens[nome] ?? SEM_MENSAGENS);
  const sendChatMensagem = useMarketplaceStore((state) => state.sendChatMensagem);

  const enviar = () => {
    const conteudo = texto.trim();
    if (!conteudo) return;
    sendChatMensagem(nome, conteudo);
    setTexto('');
  };

  return (
    <Screen style={styles.screen} padded={false}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <View style={styles.avatar} />
          <Text variant="md" weight="extraBold">
            {nome}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.mensagensContent} style={styles.mensagensScroll}>
          {mensagens.length === 0 ? (
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.emptyText}>
              Envie a primeira mensagem para {nome}.
            </Text>
          ) : (
            mensagens.map((mensagem) => (
              <View
                key={mensagem.id}
                style={[
                  styles.bubble,
                  mensagem.autor === 'usuario' ? styles.bubbleUsuario : styles.bubbleContato,
                ]}
              >
                <Text
                  variant="sm"
                  weight="semiBold"
                  color={mensagem.autor === 'usuario' ? theme.colors.text.inverse : 'primary'}
                >
                  {mensagem.texto}
                </Text>
              </View>
            ))
          )}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={texto}
            onChangeText={setTexto}
            placeholder="Escreva uma mensagem…"
            placeholderTextColor={theme.colors.text.tertiary}
            style={styles.input}
            onSubmitEditing={enviar}
            returnKeyType="send"
          />
          <Pressable style={styles.sendButton} onPress={enviar} hitSlop={8}>
            <SendIcon size={18} />
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
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl + 12,
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.placeholder.background,
  },
  mensagensScroll: {
    flex: 1,
  },
  mensagensContent: {
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  emptyText: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
  },
  bubbleUsuario: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.surfaceDark,
  },
  bubbleContato: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  inputRow: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingHorizontal: theme.spacing.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
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
