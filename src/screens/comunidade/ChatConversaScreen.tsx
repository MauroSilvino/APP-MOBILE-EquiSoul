import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { BackIcon, CameraIcon, SendIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { ChatMensagem, useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ChatConversa'>;

export function ChatConversaScreen({ navigation, route }: Props) {
  const conversas = useCommunityStore((state) => state.conversas);
  const enviarMensagem = useCommunityStore((state) => state.enviarMensagem);
  const [libraryPermission, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  const [input, setInput] = useState('');

  const conversa = conversas.find((item) => item.id === route.params.id) ?? conversas[0];

  function enviar() {
    const texto = input.trim();
    if (!texto) return;
    enviarMensagem(conversa.id, texto);
    setInput('');
  }

  async function anexarMidia() {
    let permission = libraryPermission;
    if (!permission?.granted) {
      permission = await requestLibraryPermission();
    }
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
    if (!result.canceled && result.assets[0]) {
      enviarMensagem(conversa.id, 'Enviou uma foto', result.assets[0].uri);
    }
  }

  function bubbleStyle(mensagem: ChatMensagem) {
    return mensagem.role === 'me' ? [styles.bubble, styles.bubbleMe] : [styles.bubble, styles.bubbleThem];
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Mensagens')} hitSlop={8}>
            <BackIcon size={15} />
          </Pressable>
          <View style={styles.headerAvatar} />
          <View>
            <Text variant="md" weight="bold">
              {conversa.nome}
            </Text>
            <Text variant="xs" weight="medium" color={theme.colors.accent.olive}>
              online
            </Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.messages}>
          {conversa.mensagens.map((mensagem) => (
            <View key={mensagem.id} style={bubbleStyle(mensagem)}>
              {mensagem.midiaUri ? (
                <View style={styles.mediaBubble}>
                  <CameraIcon size={16} color={mensagem.role === 'me' ? theme.colors.text.primary : theme.colors.accent.leather} />
                  <Text variant="sm" weight="semiBold" color="primary">
                    {mensagem.texto}
                  </Text>
                </View>
              ) : (
                <Text variant="sm" weight="semiBold" color="primary">
                  {mensagem.texto}
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <Pressable onPress={anexarMidia} hitSlop={8}>
            <CameraIcon size={22} color={theme.colors.accent.leather} />
          </Pressable>
          <TextField
            value={input}
            onChangeText={setInput}
            placeholder="Escrever mensagem..."
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
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.placeholder.background,
  },
  messages: {
    flexGrow: 1,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  bubble: {
    maxWidth: '75%',
    borderRadius: 16,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.accent.gold,
  },
  bubbleThem: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  mediaBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  inputRow: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
