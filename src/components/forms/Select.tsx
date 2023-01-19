import classNames from 'classnames';
import { CaretDown } from 'phosphor-react';
import { ChangeEvent, InputHTMLAttributes } from 'react';
import { Label } from './Label';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  name: string;
  label?: string;
  value: string;
  onChange?: (value: string, event: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

export const Select = ({
  className,
  name,
  label,
  value,
  onChange,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className={classNames('flex flex-col', className)}>
      {label && <Label htmlFor={name}>{label}</Label>}

      <div className="flex items-center w-full">
        <select
          id={name}
          name={name}
          value={value}
          onChange={e => onChange && onChange(e.target.value, e)}
          className="appearance-none block p-2 w-full font-medium text-sm text-neutral-900 border border-neutral-300 rounded bg-neutral-50 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-0"
          {...rest}
        >
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <CaretDown
          size={16}
          weight="bold"
          className="text-neutral-800 pointer-events-none ml-[-1.75rem]"
        />
      </div>
    </div>
  );
};
