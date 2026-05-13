import type { ProfileDTO, UpdateProfileRequestDTO, } from '../models/profile.dto';

const wait = (ms = 400): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(resolve, ms);
    });

const mockProfile: ProfileDTO = {
    id: '1',
    first_name: 'Dayanna',
    last_name_1: 'Solano',
    last_name_2: '',
    email: 'dayanasolano876@gmail.com',
    phone: '88888888',
    identification_number: '123456789',
    address: 'San José, Costa Rica',
    profile_image: null,
};

export const profileService = {
    async getProfile(): Promise<ProfileDTO> {
        await wait();
        return mockProfile;
    },

    async updateProfile(
        data: UpdateProfileRequestDTO,
    ): Promise<ProfileDTO> {
        await wait(600);

        return {
            ...mockProfile,
            ...data,
        };
    },
};