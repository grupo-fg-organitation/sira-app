import { Select } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface HomeFilterSelectOption {
  value: string;
  label: string;
}

export interface HomeFilterSelectFieldProps {
  name: string;
  placeholder: string;
  options: readonly HomeFilterSelectOption[];
  defaultValue?: string;
  className?: string;
}

const triggerClassName: string =
  'flex h-10 w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-2xl border border-border/60 bg-linear-to-b from-background to-muted/25 px-4 py-2 text-left text-sm font-medium text-foreground shadow-sm ring-1 ring-transparent transition-all duration-[220ms] ease-out hover:border-primary/35 hover:shadow-md hover:ring-primary/10 focus:outline-none focus-visible:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] data-[popup-open]:border-primary/40 data-[popup-open]:shadow-md disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100';

const itemClassName: string = cn(
  'flex cursor-pointer select-none items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/90 outline-none transition-[background-color,color,box-shadow] duration-[180ms] ease-out',
  'data-[highlighted]:bg-primary/12 data-[highlighted]:text-foreground data-[highlighted]:shadow-sm',
  'data-[selected]:bg-primary/15 data-[selected]:text-primary',
);

export function HomeFilterSelectField({
  name,
  placeholder,
  options,
  defaultValue = '',
  className,
}: HomeFilterSelectFieldProps) {
  return (
    <div
      className={cn(
        'relative min-w-[min(100%,10.5rem)] max-w-full transition-shadow duration-[220ms] ease-out sm:min-w-48 sm:max-w-[20rem]',
        className,
      )}
    >
      <Select.Root name={name} defaultValue={defaultValue} modal={false}>
        <Select.Trigger className={triggerClassName}>
          <Select.Value
            placeholder={placeholder}
            className='min-w-0 flex-1 truncate data-placeholder:text-muted-foreground'
          />
          <Select.Icon className='shrink-0 text-muted-foreground opacity-80'>
            <ChevronDown className='h-4 w-4' strokeWidth={2} aria-hidden />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Positioner
            className='z-200 outline-none'
            sideOffset={8}
            alignItemWithTrigger={false}
          >
            <Select.Popup className='max-h-64 min-w-(--anchor-width) origin-top overflow-hidden rounded-2xl border border-border/60 bg-popover/95 p-1.5 text-popover-foreground shadow-2xl shadow-black/15 ring-1 ring-black/5 backdrop-blur-md outline-none duration-200 ease-out animate-in fade-in dark:ring-white/10 motion-reduce:animate-none'>
              <Select.List className='flex max-h-56 flex-col gap-0.5 overflow-y-auto overscroll-y-contain outline-none'>
                <Select.Item
                  value=''
                  label={placeholder}
                  className={itemClassName}
                >
                  <Select.ItemText className='min-w-0 flex-1 truncate'>
                    {placeholder}
                  </Select.ItemText>
                  <Select.ItemIndicator className='flex shrink-0 text-primary'>
                    <Check className='h-4 w-4' strokeWidth={2.5} aria-hidden />
                  </Select.ItemIndicator>
                </Select.Item>
                {options.map(option => (
                  <Select.Item
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    className={itemClassName}
                  >
                    <Select.ItemText className='min-w-0 flex-1 truncate'>
                      {option.label}
                    </Select.ItemText>
                    <Select.ItemIndicator className='flex shrink-0 text-primary'>
                      <Check
                        className='h-4 w-4'
                        strokeWidth={2.5}
                        aria-hidden
                      />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
