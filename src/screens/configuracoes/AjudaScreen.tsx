import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { LegalSheet } from '../../components/ui/LegalSheet';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { ChevronRightIcon, SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Ajuda'>;

interface AjudaItem {
  label: string;
  kind: 'info' | 'form';
  body?: string;
  placeholder?: string;
  submitLabel?: string;
  success?: string;
}

const AJUDA_ITENS: AjudaItem[] = [
  {
    label: 'Perguntas frequentes',
    kind: 'info',
    body: 'Encontre respostas para as dúvidas mais comuns sobre diário, IA e privacidade.',
  },
  {
    label: 'Tutoriais',
    kind: 'info',
    body: 'Vídeos curtos mostrando como registrar memórias, criar cartas automáticas e usar retrospectivas.',
  },
  {
    label: 'Falar com suporte',
    kind: 'form',
    placeholder: 'Descreva o que você precisa...',
    submitLabel: 'Enviar mensagem',
    success: 'Mensagem enviada! Respondemos em até 24h.',
  },
  {
    label: 'Chat com a IA',
    kind: 'form',
    placeholder: 'Pergunte algo à IA do EquiSoul...',
    submitLabel: 'Enviar',
    success: 'A IA já está preparando sua resposta.',
  },
  {
    label: 'Enviar feedback',
    kind: 'form',
    placeholder: 'O que podemos melhorar?',
    submitLabel: 'Enviar feedback',
    success: 'Feedback enviado, obrigado!',
  },
  {
    label: 'Reportar um problema',
    kind: 'form',
    placeholder: 'Descreva o problema encontrado...',
    submitLabel: 'Reportar',
    success: 'Problema reportado à equipe técnica.',
  },
];

export function AjudaScreen({ navigation }: Props) {
  const [infoAberto, setInfoAberto] = useState<AjudaItem | null>(null);
  const [formAberto, setFormAberto] = useState<AjudaItem | null>(null);
  const [formValue, setFormValue] = useState('');
  const { message, show } = useToast();

  function submitForm() {
    if (formAberto?.success) show(formAberto.success);
    setFormAberto(null);
    setFormValue('');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Ajuda" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.searchBox}>
          <SearchIcon size={16} color={theme.colors.text.secondary} />
          <Text variant="sm" weight="medium" color="tertiary">
            Como podemos ajudar?
          </Text>
        </View>

        <View style={styles.list}>
          {AJUDA_ITENS.map((item) => (
            <Pressable
              key={item.label}
              style={styles.row}
              onPress={() => (item.kind === 'info' ? setInfoAberto(item) : setFormAberto(item))}
            >
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

      <Modal visible={!!formAberto} transparent animationType="fade" onRequestClose={() => setFormAberto(null)}>
        <Pressable style={styles.backdrop} onPress={() => setFormAberto(null)}>
          <Pressable style={styles.formCard} onPress={(e) => e.stopPropagation()}>
            <Text variant="lg" weight="extraBold">
              {formAberto?.label}
            </Text>
            <TextInput
              value={formValue}
              onChangeText={setFormValue}
              placeholder={formAberto?.placeholder}
              placeholderTextColor={theme.colors.text.tertiary}
              multiline
              style={styles.textarea}
            />
            <Pressable style={styles.submitButton} onPress={submitForm}>
              <Text variant="sm" weight="extraBold">
                {formAberto?.submitLabel}
              </Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={() => setFormAberto(null)}>
              <Text variant="sm" weight="bold">
                Cancelar
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Toast message={message} />
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
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  formCard: {
    width: '100%',
    maxWidth: 300,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.spacing.xl,
  },
  textarea: {
    marginTop: theme.spacing.md,
    height: 90,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.12)',
    padding: theme.spacing.md,
    fontSize: theme.typography.sizes.sm,
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: theme.spacing.md,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    marginTop: theme.spacing.sm,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
