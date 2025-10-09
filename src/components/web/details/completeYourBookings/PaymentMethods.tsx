import RadioButton from '@/components/ui/RadioButton';
import { PaymentMethod } from '@/lib/types';
import { staticPaymentMethods } from '@/utils/constants';
import React from 'react';
import { useTranslation } from '../../../../contexts/TranslationContext';

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

  const { t } = useTranslation();
  return (
    <div className='flex flex-col gap-14'>
      <h2 className='text-custom-20 mobileM:text-custom-22 laptopM:text-custom-30 font-custom-700 text-text_1 font-gellix-Bold'>
        {t('completeYourBooking.choosePaymentMethods')}
      </h2>
      <div className='flex flex-col gap-4'>
        {allMethods.map((method: PaymentMethodWithIcon, index: number) => (
          <label
            className='flex justify-between items-center cursor-pointer'
            key={index}
            onClick={() => onMethodChange(method.value || '')}
          >
            <div className='flex justify-center gap-2 items-start'>
              <div className='max-w-[50px] min-w-[50px] max-h-[50px] min-h-[50px] mobileM:max-w-[56px] mobileM:min-w-[56px] mobileM:max-h-[56px] mobileM:min-h-[56px] rounded-xl bg-secondary_2 flex items-center justify-center'>
                <img src={method.icon} alt={method.name} className='h-6 w-6' />
              </div>
              <div>
                <h1 className='font-custom-600 text-text_1 font-gellix-Bold text-custom-16 mobileM:text-custom-18 laptopM:text-custom-20'>
                  {method.name}
                </h1>
                {method.description && (
                  <p
                    className='text-gray_3 text-custom-12 mobileM:text-custom-12 laptopM:text-custom-14'
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
