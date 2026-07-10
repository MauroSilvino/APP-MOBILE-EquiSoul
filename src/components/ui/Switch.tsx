import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function Switch({ value, onValueChange }: SwitchProps) {
  return (
    <Pressable
      style={[styles.track, value && styles.trackOn]}
      onPress={() => onValueChange(!value)}
    >
      <View style={[styles.knob, value && styles.knobOn]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 46,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(43,41,36,0.15)',
    justifyContent: 'center',
  },
  trackOn: {
    backgroundColor: theme.colors.accent.moss,
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
    marginLeft: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  knobOn: {
    marginLeft: 22,
  },
});
