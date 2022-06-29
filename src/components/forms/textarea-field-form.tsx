type InputFieldFormProps = {
  label: string;
  id: string;
  rows?: number;
  customClassLabel?: string;
  customClassInput?: string;
  register?: any;
  reg?: string;
};

export default function TextareaFieldForm({
  label,
  id,
  rows,
  customClassLabel,
  customClassInput,
  register,
  reg,
}: InputFieldFormProps) {
  return (
    <>
      <label htmlFor={id} className={`block text-xs font-semibold text-gray-700 sm:mt-px sm:pt-2 ${customClassLabel}`}>
        {label}
      </label>
      <textarea
        id={id}
        rows={rows || 3}
        className={`mt-2 block w-full shadow-sm text-xs focus:primary-color focus:primary-color border-gray-300 rounded-md ${customClassInput}`}
        {...register(reg)}
      />
    </>
  );
}
