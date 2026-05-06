import type {
  CreatePurchaseRequestDto,
  CreatePurchaseResponseDto,
} from '../models/purchase-payment.dto';

import type {
  PaymentResult,
} from '../models/purchase-payment.model';

import {
  mapPurchaseToCreatePurchaseDto,
} from '../models/purchase-payment.mapper';

import type { PurchaseData } from '../models/purchase-payment.model';

// 🔥 Función principal del servicio
export const createPurchase = async (
  purchaseData: PurchaseData,
  paymentMethod: string
): Promise<PaymentResult> => {
  const dto: CreatePurchaseRequestDto =
    mapPurchaseToCreatePurchaseDto(purchaseData, paymentMethod);

  // 🔥 SIMULACIÓN (por ahora)
  const response = await fakeApiCall(dto);

  // 🔥 mapear respuesta backend → frontend
  return {
    status: response.status,
    confirmationNumber: response.confirmation_number,
  };
};



// 🔥 Simulación de API (luego la cambias por fetch o axios)
const fakeApiCall = async (
  data: CreatePurchaseRequestDto
): Promise<CreatePurchaseResponseDto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const approved = Math.random() > 0.2;

      if (approved) {
        resolve({
          id: 1,
          status: 'approved',
          confirmation_number: `ZY-${Date.now()}`,
          ticket_qr: 'QR_CODE_BASE64',
        });
      } else {
        resolve({
          id: 1,
          status: 'rejected',
          confirmation_number: '',
        });
      }
    }, 1500);
  });
};