import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import { SEAT_SELECTION_TEXT } from '../constants/seat-selection.constants';
import { images } from '../../../shared/assets/images';

export function SeatLegend(): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const items = [
    { image: images.seatNormal, bg: theme.colors.brandBlue, label: SEAT_SELECTION_TEXT.LEGEND_FREE },
    { image: images.seatNormal, bg: theme.colors.brandYellow, label: SEAT_SELECTION_TEXT.LEGEND_SELECTED },
    { image: images.seatNormal, bg: theme.colors.error, label: SEAT_SELECTION_TEXT.LEGEND_OCCUPIED, faded: false },
    { image: images.seatDisability, bg: theme.colors.brandBlue, label: 'Discapacidad' },
  ];

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.miniSeat, { backgroundColor: item.bg }, item.faded && styles.faded]}>
            <Image
              source={item.image}
              style={styles.miniImage}
              resizeMode="contain"
              tintColor={theme.colors.white}
            />
          </View>
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 14,
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    miniSeat: {
      width: 23,
      height: 24,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    faded: {
      opacity: 0.45,
    },
    miniImage: {
      width: 50,
      height: 33,
    },
    label: {
      fontSize: theme.typography.xs,
      color: theme.colors.textSecondary,
      fontWeight: '500',
    },
  });
}
