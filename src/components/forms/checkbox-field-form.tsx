type CheckboxFieldFormProps = {
  label: string;
  id: string;
  details?: string;
  customClassLabel?: string;
  customClassInput?: string;
  register?: any;
  reg?: string;
  getRegValue?: any;
};

export default function CheckboxFieldForm({
  label,
  id,
  details,
  customClassLabel,
  customClassInput,
  register,
  reg,
}: CheckboxFieldFormProps) {
  return (
    <>
      <div className='flex items-center h-5 sm:mt-px sm:pt-10 mb-10'>
        <div className='flex items-center h-5'>
          <input
            id={id}
            type='checkbox'
            className='focus:ring-white h-4 w-4 text-primary-color border-gray-300 rounded'
            {...register(reg)}
          />
        </div>
        <div className='ml-3 text-sm'>
          <label htmlFor={id} className='font-medium text-gray-700'>
            {label}
          </label>
          {details && <p className='text-gray-500'>{details}</p>}
        </div>
      </div>
    </>
  );
}
