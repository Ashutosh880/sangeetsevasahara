import { AlertCircle, CheckCircle2, Upload, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FieldConfig, uploadProfileImage, insertOtp, verifyOtp } from '../../lib/api';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';

interface DynamicFormRendererProps {
  fields: Array<{
    id: number;
    field_order: number;
    field_config: FieldConfig;
  }>;
  formData: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
  errors: Record<string, string>;
  onError: (fieldName: string, error: string) => void;
  onToast: (message: string, type: 'success' | 'error') => void;
}

export function DynamicFormRenderer({
  fields,
  formData,
  onChange,
  errors,
  onError,
  onToast
}: DynamicFormRendererProps) {
  const [otpStates, setOtpStates] = useState<Record<string, {
    otpSent: boolean;
    otpVerified: boolean;
    otp: string;
  }>>({});

  const [filePreview, setFilePreview] = useState<Record<string, string>>({});

  const handleFileChange = async (fieldName: string, file: File | null, config: FieldConfig) => {
    if (!file) return;

    const fileConfig = config.file_config;
    if (!fileConfig) return;

    if (file.size > fileConfig.max_size_mb * 1024 * 1024) {
      onError(fieldName, `File size must be less than ${fileConfig.max_size_mb}MB`);
      return;
    }

    if (config.field_type === 'file') {
      if (fileConfig.preview) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(prev => ({ ...prev, [fieldName]: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }

      try {
        const result: any = await uploadProfileImage(file);
        onChange(fieldName, result.path || result.filePath);
        onToast('Image uploaded successfully', 'success');
      } catch (err) {
        onError(fieldName, 'Failed to upload image');
        onToast('Failed to upload image', 'error');
      }
    }
  };

  const sendOTP = async (fieldName: string, mobile: string) => {
    if (!mobile || mobile.length !== 10) {
      onError(fieldName, 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      await insertOtp({ mobile });
      setOtpStates(prev => ({
        ...prev,
        [fieldName]: { otpSent: true, otpVerified: false, otp: '' }
      }));
      onToast('OTP sent successfully', 'success');
    } catch (err) {
      onToast('Failed to send OTP', 'error');
    }
  };

  const verifyOTP = async (fieldName: string, mobile: string, otp: string) => {
    try {
      const res: any = await verifyOtp({ mobile, otp });
      if (res?.verified) {
        setOtpStates(prev => ({
          ...prev,
          [fieldName]: { ...prev[fieldName], otpVerified: true }
        }));
        onToast('Mobile number verified successfully', 'success');
      } else {
        onToast('Invalid or expired OTP', 'error');
      }
    } catch (err) {
      onToast('Invalid or expired OTP', 'error');
    }
  };

  const handleCopyFromField = (fieldName: string, copyFromField: string, checked: boolean) => {
    if (checked) {
      onChange(fieldName, formData[copyFromField] || '');
    } else {
      onChange(fieldName, '');
    }
  };

  const validateField = (config: FieldConfig, value: any): string | null => {
    if (config.required && !value) {
      return `${config.label} is required`;
    }

    const validation = config.validation;
    if (!validation) return null;

    if (typeof value === 'string') {
      if (validation.min_length && value.length < validation.min_length) {
        return validation.error_message || `Minimum length is ${validation.min_length}`;
      }
      if (validation.max_length && value.length > validation.max_length) {
        return validation.error_message || `Maximum length is ${validation.max_length}`;
      }
      if (validation.pattern && !new RegExp(validation.pattern).test(value)) {
        return validation.error_message || 'Invalid format';
      }
    }

    if (typeof value === 'number') {
      if (validation.min !== undefined && value < validation.min) {
        return validation.error_message || `Minimum value is ${validation.min}`;
      }
      if (validation.max !== undefined && value > validation.max) {
        return validation.error_message || `Maximum value is ${validation.max}`;
      }
    }

    if (Array.isArray(value)) {
      if (validation.min_selected && value.length < validation.min_selected) {
        return validation.error_message || `Select at least ${validation.min_selected} option(s)`;
      }
      if (validation.max_selected && value.length > validation.max_selected) {
        return validation.error_message || `Select maximum ${validation.max_selected} option(s)`;
      }
    }

    return null;
  };

  const renderField = (field: { id: number; field_order: number; field_config: FieldConfig }) => {
    const config = field.field_config;
    const fieldName = config.field_name;
    const value = formData[fieldName] || '';
    const gridCols = config.grid_cols || 12;
    const colClass = `col-span-${gridCols}`;

    switch (config.field_type) {
      case 'text':
      case 'email':
      case 'url':
        return (
          <div key={field.id} className={`${colClass}`}>
            <Input
              label={config.label}
              name={fieldName}
              type={config.field_type}
              value={value}
              onChange={(e) => onChange(fieldName, e.target.value)}
              placeholder={config.placeholder}
              required={config.required}
              error={errors[fieldName]}
            />
          </div>
        );

      case 'tel':
        const otpState = otpStates[fieldName] || { otpSent: false, otpVerified: false, otp: '' };

        return (
          <div key={field.id} className={`${colClass} space-y-3`}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label={config.label}
                name={fieldName}
                type="tel"
                value={value}
                onChange={(e) => onChange(fieldName, e.target.value)}
                placeholder={config.placeholder}
                maxLength={10}
                required={config.required}
                error={errors[fieldName]}
                disabled={config.enable_otp_verification && otpState.otpVerified}
              />
              {config.enable_otp_verification && (
                <div className="flex items-end gap-2">
                  {!otpState.otpVerified && !otpState.otpSent && (
                    <Button
                      type="button"
                      onClick={() => sendOTP(fieldName, value)}
                      variant="secondary"
                      className="w-full"
                    >
                      Send OTP
                    </Button>
                  )}
                  {otpState.otpVerified && (
                    <div className="flex items-center gap-2 text-green-500 w-full justify-center">
                      <CheckCircle2 size={20} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {config.enable_otp_verification && otpState.otpSent && !otpState.otpVerified && (
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Enter OTP"
                  value={otpState.otp}
                  onChange={(e) => setOtpStates(prev => ({
                    ...prev,
                    [fieldName]: { ...prev[fieldName], otp: e.target.value }
                  }))}
                  maxLength={6}
                />
                <div className="flex items-end">
                  <Button
                    type="button"
                    onClick={() => verifyOTP(fieldName, value, otpState.otp)}
                    variant="secondary"
                    className="w-full"
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            {config.show_copy_checkbox && config.copy_from_field && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => handleCopyFromField(fieldName, config.copy_from_field!, e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-300">{config.copy_checkbox_label}</span>
              </label>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.id} className={`${colClass}`}>
            <Input
              label={config.label}
              name={fieldName}
              type="number"
              value={value}
              onChange={(e) => onChange(fieldName, parseFloat(e.target.value))}
              placeholder={config.placeholder}
              required={config.required}
              error={errors[fieldName]}
            />
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className={`${colClass}`}>
            <Input
              label={config.label}
              name={fieldName}
              type="date"
              value={value}
              onChange={(e) => onChange(fieldName, e.target.value)}
              required={config.required}
              error={errors[fieldName]}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className={`${colClass}`}>
            <Select
              label={config.label}
              name={fieldName}
              value={value}
              onChange={(e) => onChange(fieldName, e.target.value)}
              options={config.options || []}
              required={config.required}
              error={errors[fieldName]}
            />
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className={`${colClass}`}>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {config.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={fieldName}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => onChange(fieldName, e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[fieldName] && <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className={`${colClass}`}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name={fieldName}
                checked={!!value}
                onChange={(e) => onChange(fieldName, e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-white">{config.label} {config.required && <span className="text-red-500">*</span>}</span>
            </label>
            {errors[fieldName] && <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>}
          </div>
        );

      case 'checkbox_group':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div key={field.id} className={`${colClass}`}>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {config.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        onChange(fieldName, [...selectedValues, option.value]);
                      } else {
                        onChange(fieldName, selectedValues.filter((v: string) => v !== option.value));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
            {errors[fieldName] && <p className="mt-1 text-sm text-red-500">{errors[fieldName]}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className={`${colClass}`}>
            <Textarea
              label={config.label}
              name={fieldName}
              value={value}
              onChange={(e) => onChange(fieldName, e.target.value)}
              placeholder={config.placeholder}
              rows={config.rows || 3}
              required={config.required}
              error={errors[fieldName]}
            />
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className={`${colClass}`}>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {config.label} {config.required && <span className="text-red-500">*</span>}
            </label>
            {config.file_config && (
              <p className="text-sm text-gray-400 mb-3">
                Max {config.file_config.max_size_mb}MB, {config.file_config.accept.split(',').join(', ')}
              </p>
            )}
            <div className="relative">
              <input
                type="file"
                accept={config.file_config?.accept}
                onChange={(e) => handleFileChange(fieldName, e.target.files?.[0] || null, config)}
                className="hidden"
                id={`file-${fieldName}`}
              />
              <label
                htmlFor={`file-${fieldName}`}
                className="flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors"
              >
                {filePreview[fieldName] ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={filePreview[fieldName]} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
                    <span className="text-white text-sm">Click to change</span>
                  </div>
                ) : value ? (
                  <>
                    <CheckCircle2 size={24} className="text-green-500" />
                    <span className="text-white">File uploaded</span>
                  </>
                ) : (
                  <>
                    <Camera size={24} className="text-gray-400" />
                    <span className="text-gray-400">Click to upload image</span>
                  </>
                )}
              </label>
            </div>
            {errors[fieldName] && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <AlertCircle size={16} />
                {errors[fieldName]}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      {fields
        .sort((a, b) => a.field_order - b.field_order)
        .map((field) => renderField(field))}
    </div>
  );
}
