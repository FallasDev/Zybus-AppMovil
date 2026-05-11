import { type AuthResponseDTO, toLoginRequestDTO, toRegisterRequestDTO, } from '../models/auth.dto';
import type { LoginFormData, RegisterFormData, VerificationFormData, } from '../models/auth.model';

const wait = (ms = 300): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const mockUser: AuthResponseDTO = {
    token: 'mock-jwt-token',
    user: {
        id: '1',
        first_name: 'Juan',
        last_name_1: 'Pérez',
        last_name_2: 'Soto',
        email: 'juan@example.com',
        phone: '88888888',
        identification_number: '123456789',
        state_id: '1',
        role_id: '3',
        is_active: true,
    },
};

export const authService = {
    async login(data: LoginFormData,): Promise<AuthResponseDTO> {
        await wait(500);
        const payload = toLoginRequestDTO(data);
        console.log('LOGIN REQUEST', payload);
        return mockUser;
    },

    async register(data: RegisterFormData,): Promise<AuthResponseDTO> {
        await wait(700);
        const payload = toRegisterRequestDTO(data);
        console.log('REGISTER REQUEST', payload);
        return mockUser;
    },

    async verifyCode(data: VerificationFormData,): Promise<boolean> {
        await wait(400);
        console.log('VERIFY CODE', data.code);
        return true;
    },

    async logout(): Promise<boolean> {
        await wait(300);
        return true;
    },
};