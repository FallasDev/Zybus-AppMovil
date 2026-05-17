import type { ReactElement } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { TicketHeroCard } from '../components/TicketHeroCard';
import { TicketQRCard } from '../components/TicketQRCard';
import { TicketInfoGrid } from '../components/TicketInfoGrid';
import { TicketDetailsCard } from '../components/TicketDetailsCard';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { RootStackParamList } from '../../../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'TicketDetailScreen'>;

export function TicketDetailScreen({ route }: Props): ReactElement {
  const { ticket } = route.params;
  const { theme } = useAppTheme();
  const isActive = new Date(ticket.departureDatetime) >= new Date();

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.colors.background }]}>
      <Header title="Detalle del ticket" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TicketHeroCard
          routeName={ticket.routeName}
          departureDatetime={ticket.departureDatetime}
          isActive={isActive}
        />

        <TicketQRCard
          qrCode={ticket.qrCode}
          confirmationNumber={ticket.confirmationNumber}
        />

        <TicketInfoGrid
          passengerName={ticket.passengerName}
          seatLabel={ticket.seatLabel}
          price={ticket.price}
          issuedAt={ticket.issuedAt}
        />

        <TicketDetailsCard
          tripId={ticket.tripId}
          purchaseId={ticket.purchaseId}
          state={ticket.state}
          issuedAt={ticket.issuedAt}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 48,
    gap: 16,
  },
});
