import { HttpStatus } from "@nestjs/common";

export const errors = {
  requiredField: (field: string): string => `El campo ${field} es requerido`,
  invalidFormat: (field: string): string => `El ${field} es invalido`,
  dataRecorded: 'Esta información ya está registrada'
};

export const ERRORS_HTTP = {
  ERROR: {
    message: "Ha ocurrido un error inesperado",
    status: HttpStatus.INTERNAL_SERVER_ERROR
  },
  REGISTERED_EMAIL: {
    message: "El email ya está registrado",
    status: HttpStatus.BAD_REQUEST
  }
}

export const SUCCESS_HTTP = {
  SUCCESS: {
    message: "Operación exitosa",
    status: HttpStatus.OK
  },
  CREATED: {
    message: "El registro se ha creado correctamente",
    status: HttpStatus.CREATED
  }
}
