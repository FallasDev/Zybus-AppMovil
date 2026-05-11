export const AUTH_ERRORS = {
  EMAIL_REQUIRED: 'EMAIL_REQUIRED',
  EMAIL_INVALID: 'EMAIL_INVALID',

  PASSWORD_REQUIRED: 'PASSWORD_REQUIRED',
  PASSWORD_MIN_LENGTH: 'PASSWORD_MIN_LENGTH',
  PASSWORDS_NOT_MATCH: 'PASSWORDS_NOT_MATCH',

  FIRST_NAME_REQUIRED: 'FIRST_NAME_REQUIRED',
  LAST_NAME_1_REQUIRED: 'LAST_NAME_1_REQUIRED',

  PHONE_REQUIRED: 'PHONE_REQUIRED',

  IDENTIFICATION_REQUIRED: 'IDENTIFICATION_REQUIRED',

  TERMS_REQUIRED: 'TERMS_REQUIRED',

  VERIFICATION_CODE_REQUIRED: 'VERIFICATION_CODE_REQUIRED',
  VERIFICATION_CODE_INVALID: 'VERIFICATION_CODE_INVALID',
} as const;

export type AuthErrorCode =
  (typeof AUTH_ERRORS)[keyof typeof AUTH_ERRORS];

export const LOGIN_TEXT = {
  TITLE: 'Bienvenido de nuevo',
  SUBTITLE: 'Inicia sesión para continuar',

  EMAIL_LABEL: 'Correo electrónico',
  EMAIL_PLACEHOLDER: 'Tu correo electrónico',

  PASSWORD_LABEL: 'Contraseña',
  PASSWORD_PLACEHOLDER: 'Tu contraseña',

  FORGOT_PASSWORD: '¿Olvidaste tu contraseña?',

  LOGIN_BUTTON: 'Inicia sesión',

  GOOGLE_BUTTON: 'Continuar con Google',

  NO_ACCOUNT: 'No tienes cuenta?',
  REGISTER_NOW: 'Registra ahora',
} as const;

export const REGISTER_TEXT = {
  TITLE: 'Crea tu cuenta',

  STEP_ONE_SUBTITLE: 'Paso 1 de 2: Datos personales',
  STEP_TWO_SUBTITLE: 'Paso 2 de 2: Contacto y seguridad',

  FIRST_NAME_LABEL: 'Nombre',
  FIRST_NAME_PLACEHOLDER: 'Tu nombre',

  LAST_NAME_1_LABEL: 'Primer apellido',
  LAST_NAME_1_PLACEHOLDER: 'Primer apellido',

  LAST_NAME_2_LABEL: 'Segundo apellido',
  LAST_NAME_2_PLACEHOLDER: 'Segundo apellido',

  EMAIL_LABEL: 'Correo electrónico',
  EMAIL_PLACEHOLDER: 'Tu correo electrónico',

  PHONE_LABEL: 'Teléfono',
  PHONE_PLACEHOLDER: 'Tu número de teléfono',

  IDENTIFICATION_LABEL: 'Número de identificación',
  IDENTIFICATION_PLACEHOLDER: 'Tu número de identificación',

  PASSWORD_LABEL: 'Contraseña',
  PASSWORD_PLACEHOLDER: 'Crea una contraseña',

  CONFIRM_PASSWORD_LABEL: 'Confirmar contraseña',
  CONFIRM_PASSWORD_PLACEHOLDER: 'Confirma tu contraseña',

  TERMS_TEXT: 'Acepto los Términos y Condiciones y la Política de Privacidad',

  CONTINUE_BUTTON: 'Continuar',
  CREATE_ACCOUNT_BUTTON: 'Crear cuenta',

  BACK_BUTTON: 'Volver',

  ALREADY_HAVE_ACCOUNT: '¿Ya tienes una cuenta?',
  LOGIN_NOW: 'Inicia sesión',
} as const;

export const VERIFICATION_TEXT = {
  TITLE: 'Verificación',

  SUBTITLE:
    'Ingresa el código de 4 dígitos que enviamos al número proporcionado.',

  CONTINUE_BUTTON: 'Continuar',

  RESEND_CODE: '¿No recibiste el código? Reenviar',
} as const;