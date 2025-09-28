import RadioButton from '@/components/ui/RadioButton';
import { PaymentMethod } from '@/lib/types';
import { staticPaymentMethods } from '@/utils/constants';
import React from 'react';

interface PaymentMethodWithIcon extends PaymentMethod {
  icon?: string;
  value?: string;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[] | undefined;
  selectedMethod: string;
  onMethodChange: (value: string) => void;
}

const isPayOnSite = (name: string) =>
  name === 'On-site Cash Payment' || name === 'On-site Card Payment';

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods,
  selectedMethod,
  onMethodChange,
}) => {
  const allMethods: PaymentMethodWithIcon[] =
    methods?.map(method => {
      const staticMethod = staticPaymentMethods.find(
        staticMethod => staticMethod.name === method.name
      );
      return {
        ...method,
        value: method._id,
        icon:
          staticMethod?.icon ||
          `/SVGs/shared/payment-icons/${method.name.toLowerCase().replace(/\s+/g, '')}Icon.svg`,
      };
    }) || [];

  React.useEffect(() => {
    if (!selectedMethod) {
      onMethodChange(allMethods[0].value || '');
    }
  }, [selectedMethod, onMethodChange, allMethods]);

  const selectedMethodObj = allMethods.find(m => m.value === selectedMethod);
  const disableAttachment =
    selectedMethodObj && isPayOnSite(selectedMethodObj.name);

  return (
    <div className='flex flex-col gap-14'>
      <h2 className='text-3xl font-custom-700 text-text_1 font-gellix-Bold'>
        Choose Payment Methods
      </h2>
      <div className='flex flex-col gap-4'>
        {allMethods.map((method: PaymentMethodWithIcon, index: number) => (
          <label
            className='flex justify-between items-center cursor-pointer'
            key={index}
            onClick={() => onMethodChange(method.value || '')}
          >
            <div className='flex justify-center gap-2 items-start'>
              <div className='max-w-[56px] min-w-[56px] max-h-[56px] min-h-[56px] rounded-xl bg-secondary_2 flex items-center justify-center'>
                <img src={method.icon} alt={method.name} className='h-6 w-6' />
              </div>
              <div>
                <h1 className='font-custom-600 text-text_1 font-gellix-Bold text-xl'>
                  {method.name}
                </h1>
                {method.description && (
                  <p
                    className='text-gray_3 text-sm'
                    dangerouslySetInnerHTML={{
                      __html: method.description,
                    }}
                  />
                )}
              </div>
            </div>
            <RadioButton
              id='paymentMethod'
              name='paymentMethod'
              label=''
              value={method.value || ''}
              checked={selectedMethod === method.value}
              onChange={() => onMethodChange(method.value || '')}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
