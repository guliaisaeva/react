import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { addFormData } from './store/formSlice';

interface HookFormProps {
  onSuccess: () => void;
}

interface FormInputs {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  country: string;
  image?: FileList;
}

const schema: yup.Schema<FormInputs> = yup.object({
  name: yup
    .string()
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with an uppercase letter.')
    .required('Name is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .min(0, 'No negative values')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[0-9]/, 'At least one number')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/[a-z]/, 'At least one lowercase letter')
    .matches(/[^a-zA-Z0-9]/, 'At least one special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms')
    .required('You must accept the terms'),
  country: yup.string().required('Country is required'),
  image: yup
    .mixed<FileList>()
    .test('fileSize', 'Image too large (max 2MB)', (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || value.length === 0) return true;
      return ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
});

const HookForm: React.FC<HookFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: undefined,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      acceptTerms: false,
      country: '',
      image: undefined,
    },
  });

  const imageFile = watch('image');
  React.useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const toBase64 = (file: File | undefined) =>
    new Promise<string | undefined>((resolve) => {
      if (!file) return resolve(undefined);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const imageBase64 =
      data.image && data.image.length > 0 ? await toBase64(data.image[0]) : '';
    dispatch(
      addFormData({
        name: data.name,
        age: data.age,
        email: data.email,
        password: data.password,
        gender: data.gender,
        acceptTerms: data.acceptTerms,
        imageBase64: imageBase64 || '',
        country: data.country,
      })
    );
    reset();
    setImagePreview(null);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" {...register('name')} />
        {errors.name && (
          <div style={{ color: 'red' }}>{errors.name.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" {...register('age')} />
        {errors.age && <div style={{ color: 'red' }}>{errors.age.message}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" {...register('email')} />
        {errors.email && (
          <div style={{ color: 'red' }}>{errors.email.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" {...register('password')} />
        {errors.password && (
          <div style={{ color: 'red' }}>{errors.password.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <div style={{ color: 'red' }}>{errors.confirmPassword.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <div style={{ color: 'red' }}>{errors.gender.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input id="country" list="country-list" {...register('country')} />
        <datalist id="country-list">
          {countries.map((c: string) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && (
          <div style={{ color: 'red' }}>{errors.country.message}</div>
        )}
      </div>
      <div>
        <label htmlFor="image">Upload Picture:</label>
        <input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          {...register('image')}
        />
        {errors.image && (
          <div style={{ color: 'red' }}>{errors.image.message as string}</div>
        )}
        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              style={{ maxWidth: 100, marginTop: 8 }}
            />
          </div>
        )}
      </div>
      <div>
        <label>
          <input type="checkbox" {...register('acceptTerms')} /> Accept Terms
          and Conditions
        </label>
        {errors.acceptTerms && (
          <div style={{ color: 'red' }}>{errors.acceptTerms.message}</div>
        )}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookForm;
