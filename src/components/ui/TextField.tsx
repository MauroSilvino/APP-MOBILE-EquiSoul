import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

interface TextFieldProps extends TextInputProps {
  error?: string;
}

export function TextField({ error, style, ...props }: TextFieldProps) {
  return (
    <View>
      <TextInput
        placeholderTextColor={theme.colors.text.tertiary}
        style={[styles.input, !!error && styles.inputError, style]}
        {...props}
      />
      {!!error && (
        <Text variant="xs" weight="semiBold" color={theme.colors.error} style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 52,
    borderRadius: theme.radius.card,
    borderWidth: 1,
    borderColor: 'rgba(43,41,36,0.12)',
    backgroundColor: '#fff',
    paddingHorizontal: theme.spacing.lg,
    fontSize: theme.typography.sizes.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    color: theme.colors.text.primary,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  error: {
    marginTop: theme.spacing.xs,
  },
});
