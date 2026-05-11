export const PROFILE_ERRORS = {
    FIRST_NAME_REQUIRED: 'FIRST_NAME_REQUIRED',
    EMAIL_REQUIRED: 'EMAIL_REQUIRED',
    EMAIL_INVALID: 'EMAIL_INVALID',
    PHONE_REQUIRED: 'PHONE_REQUIRED',
    IDENTIFICATION_REQUIRED: 'IDENTIFICATION_REQUIRED',
} as const;

export type ProfileErrorCode =
    (typeof PROFILE_ERRORS)[keyof typeof PROFILE_ERRORS];

export const PROFILE_TEXT = {
    TITLE: 'Mi Perfil',
    SUBTITLE: 'Administra tu información personal',
    SAVE_BUTTON: 'Guardar cambios',
    EDIT_PHOTO: 'Cambiar foto',
    FIRST_NAME_LABEL: 'Nombre',
    LAST_NAME_1_LABEL: 'Primer apellido',
    LAST_NAME_2_LABEL: 'Segundo apellido',
    EMAIL_LABEL: 'Correo electrónico',
    PHONE_LABEL: 'Teléfono',
    IDENTIFICATION_LABEL: 'Número de identificación',
    ADDRESS_LABEL: 'Dirección',
} as const;