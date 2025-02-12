import * as Yup from 'yup';
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Kullanıcı adı zorunludur')
    .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır'),
  password: Yup.string()
    .required('Şifre zorunludur')
    .min(6, 'Şifre en az 6 karakter olmalıdır'),
});
