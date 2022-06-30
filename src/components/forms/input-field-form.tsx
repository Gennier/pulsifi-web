type InputFieldFormProps = {
  label: string;
  type: string;
  id: string;
  customClassLabel?: string;
  customClassInput?: string;
  register?: any;
  reg?: string;
  handleOnChange?: Function;
  required?: boolean;
};

export default function InputFieldForm({
  label,
  type,
  id,
  customClassLabel,
  customClassInput,
  register,
  reg,
  handleOnChange,
  required = true,
}: InputFieldFormProps) {
  return (
    <div>
      <label htmlFor={id} className={`block text-xs font-semibold text-gray-700 sm:mt-px sm:pt-2 ${customClassLabel}`}>
        {label}
      </label>
      <input
        required={required}
        type={type}
        id={id}
        className={`mt-2 block w-full shadow-sm text-xs focus:primary-color focus:primary-color border-gray-300 rounded-md ${customClassInput}`}
        {...register(reg, {
          ...(handleOnChange && {
            onChange: (e: any) => {
              handleOnChange(e.target.value);
            },
          }),
        })}
      />
    </div>
  );
}
