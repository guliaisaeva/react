import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '../store/formSlice';
import { RootState } from '../store';

interface UncontrolledFormProps {
  onSuccess: () => void;
}

const UncontrolledForm: React.FC<UncontrolledFormProps> = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simple validation function (expand as needed)
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const name = nameRef.current?.value || '';
    const age = ageRef.current?.value || '';
    const email = emailRef.current?.value || '';
    const password = passwordRef.current?.value || '';
    const confirmPassword = confirmPasswordRef.current?.value || '';
    const gender = genderRef.current?.value || '';
    const terms = termsRef.current?.checked;
    const country = countryRef.current?.value || '';

    if (!/^[A-Z][a-zA-Z]*$/.test(name))
      newErrors.name = 'Name must start with an uppercase letter.';
    if (!age || isNaN(Number(age)) || Number(age) < 0)
      newErrors.age = 'Age must be a non-negative number.';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address.';
    if (password !== confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match.';
    if (!gender) newErrors.gender = 'Gender is required.';
    if (!terms) newErrors.terms = 'You must accept the terms.';
    if (!country) newErrors.country = 'Country is required.';

    // Add more validation as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Convert image to base64 (implement this utility separately)
    // const imageBase64 = await toBase64(imageRef.current?.files?.[0]);

    dispatch(
      addFormData({
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value) || 0,
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        acceptTerms: termsRef.current?.checked || false,
        imageBase64: '', // Add image conversion here
        country: countryRef.current?.value || '',
      })
    );
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name">Name:</label>
        <input id="name" ref={nameRef} />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input id="age" type="number" ref={ageRef} />
        {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref={emailRef} />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref={passwordRef} />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input id="confirmPassword" type="password" ref={confirmPasswordRef} />
        {errors.confirmPassword && (
          <div style={{ color: 'red' }}>{errors.confirmPassword}</div>
        )}
      </div>
      <div>
        <label htmlFor="gender">Gender:</label>
        <select id="gender" ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}
      </div>
      <div>
        <label htmlFor="country">Country:</label>
        <input id="country" list="country-list" ref={countryRef} />
        <datalist id="country-list">
          {countries.map((c: string) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        {errors.country && <div style={{ color: 'red' }}>{errors.country}</div>}
      </div>
      <div>
        <label htmlFor="image">Upload Picture:</label>
        <input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          ref={imageRef}
        />
        {/* Add image validation and preview */}
      </div>
      <div>
        <label>
          <input type="checkbox" ref={termsRef} /> Accept Terms and Conditions
        </label>
        {errors.terms && <div style={{ color: 'red' }}>{errors.terms}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
