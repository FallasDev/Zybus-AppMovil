import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import { LoadingState, EmptyState } from '../../../shared/components';
import type { AppTheme } from '../../../shared/theme/types';
import type { RootStackParamList } from '../../../navigation/types';
import { useTracking } from '../hooks/useTracking';
import { TrackingMap } from '../components/TrackingMap';
import { TripStatusBar } from '../components/TripStatusBar';
import { StopProgressTimeline } from '../components/StopProgressTimeline';
import { DriverBusCard } from '../components/DriverBusCard';
import { IncidentAlert } from '../components/IncidentAlert';
import { TRACKING_TEXT } from '../constants/tracking.constants';

type TrackingNavProp = NativeStackNavigationProp<RootStackParamList, 'TripTracking'>;
type TrackingRouteProp = NativeStackScreenProps<RootStackParamList, 'TripTracking'>['route'];

export function TripTrackingScreen(): ReactElement {
  const navigation = useNavigation<TrackingNavProp>();
  const route = useRoute<TrackingRouteProp>();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { tripId } = route.params;
  const { tracking, busPosition, stops, nextStop, isLoading, error } = useTracking(tripId);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>{TRACKING_TEXT.BACK}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {tracking?.routeName ?? TRACKING_TEXT.TITLE}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {isLoading ? (
        <LoadingState message={TRACKING_TEXT.LOADING} />
      ) : error ? (
        <View style={styles.errorWrap}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : !tracking ? (
        <EmptyState title="Sin información" description={TRACKING_TEXT.ERROR_NOT_FOUND} />
      ) : (
        <>
          <TrackingMap stops={stops} busPosition={busPosition} />

          <ScrollView
            style={styles.panel}
            contentContainerStyle={styles.panelContent}
            showsVerticalScrollIndicator={false}
          >
            <TripStatusBar
              stateName={tracking.stateName}
              etaMinutes={tracking.etaMinutes}
              nextStop={nextStop}
            />
            <IncidentAlert incidents={tracking.incidents} />
            <DriverBusCard driver={tracking.driver} bus={tracking.bus} />
            <StopProgressTimeline stops={stops} />
            <View style={styles.bottomSpacer} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 52,
      paddingBottom: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    backBtn: {
      minWidth: 60,
    },
    backText: {
      fontSize: theme.typography.md,
      color: theme.colors.brandBlue,
      fontWeight: '600',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontSize: theme.typography.md,
      fontWeight: '700',
      color: theme.colors.textPrimary,
    },
    headerSpacer: {
      minWidth: 60,
    },
    panel: {
      flex: 1,
    },
    panelContent: {
      padding: 12,
    },
    errorWrap: {
      margin: 20,
      padding: 16,
      backgroundColor: theme.colors.errorSurface,
      borderRadius: 12,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.sm,
    },
    bottomSpacer: {
      height: 24,
    },
  });
}
