import { memo, useMemo } from 'react';
import type { ReactElement } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { Seat } from '../models/seat-selection.model';
import { images } from '../../../shared/assets/images';

interface SeatItemProps {
  seat: Seat;
  isSelected: boolean;
  onPress: () => void;
}

export const SeatItem = memo(function SeatItem({
  seat,
  isSelected,
  onPress,
}: SeatItemProps): ReactElement {
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const isOccupied = seat.status === 'occupied';
  const seatImage = seat.isAccessible ? images.seatDisability : images.seatNormal;

  const bgColor = isSelected
    ? theme.colors.brandYellow
    : isOccupied
      ? theme.colors.error
      : theme.colors.brandBlue;

  const codeColor = isSelected ? theme.colors.brandBlue : theme.colors.white;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isOccupied}
      activeOpacity={0.75}
      style={[styles.seat, { backgroundColor: bgColor }, isOccupied && styles.seatOccupied]}
    >
      <Image
        source={seatImage}
        style={styles.seatImage}
        resizeMode="contain"
        tintColor={theme.colors.white}
      />
      <Text style={[styles.seatCode, { color: codeColor }]}>{seat.seatCode}</Text>
    </TouchableOpacity>
  );
});

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    seat: {
  width: 52,
  height: 60,
  borderRadius: 8,
  margin: 3,
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 5,
  gap: 2,
},
    seatOccupied: {
      
    },
    seatImage: {
  width: 52,
  height: 38,
},
seatCode: {
  fontSize: 10,
  fontWeight: '700',
},
  });
}
