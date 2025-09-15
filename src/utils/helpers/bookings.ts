interface PricingInfo {
  discount: number | null;
  personType: string;
  price: number;
  minUnit: number;
  maxUnit: number;
}

interface GuestData {
  adults?: number;
  children?: number;
  infants?: number;
}

interface Extra {
  nameEn: string;
  nameAr: string;
  price: number;
}

interface PriceBreakdownItem {
  label: string;
  amount: number;
  originalPrice: number;
  discount: number | null;
  guestCount: number;
  isFree: boolean;
  pricePerPerson: number;
  type?: 'guest' | 'extra' | 'nights' | 'transportation' | 'guide';
}

export const calculatePriceBreakdown = (
  pricingInformation: PricingInfo[],
  guests: GuestData,
  extras?: Extra[],
  numberOfNights?: number,
  transportationFee?: number,
  guideFee?: number,
  hasTransportation?: boolean,
  hasGuide?: boolean
): PriceBreakdownItem[] => {
  const breakdown: PriceBreakdownItem[] = [];

  Object.entries(guests).forEach(([guestType, guestCount]) => {
    if (!guestCount || guestCount <= 0) return;

    const guestTypePricing = pricingInformation.filter(
      pricing => pricing.personType === guestType
    );

    if (guestTypePricing.length === 0) return;

    const applicablePricing = guestTypePricing.find(
      pricing => guestCount >= pricing.minUnit && guestCount <= pricing.maxUnit
    );

    if (!applicablePricing) return;

    const originalPrice = applicablePricing.price;
    const discount = applicablePricing.discount;
    const isFree = originalPrice === 0;

    let finalPricePerPerson = originalPrice;
    if (discount && discount > 0) {
      finalPricePerPerson = discount; // discount is the final discounted price
    }

    const nights = numberOfNights || 1;
    const totalAmount = finalPricePerPerson * guestCount * nights;

    breakdown.push({
      label: `${guestType.charAt(0).toUpperCase() + guestType.slice(1)} (${guestCount})`,
      amount: totalAmount,
      originalPrice,
      discount,
      guestCount,
      isFree,
      pricePerPerson: finalPricePerPerson,
      type: 'guest',
    });
  });

  if (numberOfNights && numberOfNights >= 1) {
    breakdown.push({
      label: `Number of nights`,
      amount: 0,
      originalPrice: 0,
      discount: null,
      guestCount: numberOfNights,
      isFree: false,
      pricePerPerson: 0,
      type: 'nights',
    });
  }

  if (extras && extras.length > 0) {
    extras.forEach(extra => {
      const nights = numberOfNights || 1;
      const totalAmount = extra.price * nights;
      const isFree = extra.price === 0;

      breakdown.push({
        label: extra.nameEn,
        amount: totalAmount,
        originalPrice: extra.price,
        discount: null,
        guestCount: 1,
        isFree,
        pricePerPerson: extra.price,
        type: 'extra',
      });
    });
  }

  // Add transportation fee if selected
  if (hasTransportation && transportationFee !== undefined) {
    const nights = numberOfNights || 1;
    const totalTransportationAmount = transportationFee * nights;
    const isFree = transportationFee === 0;

    breakdown.push({
      label: 'Transportation',
      amount: totalTransportationAmount,
      originalPrice: transportationFee,
      discount: null,
      guestCount: 1,
      isFree: isFree,
      pricePerPerson: transportationFee,
      type: 'transportation',
    });
  }

  // Add guide fee if selected
  if (hasGuide && guideFee !== undefined) {
    const nights = numberOfNights || 1;
    const totalGuideAmount = guideFee * nights;
    const isFree = guideFee === 0;

    breakdown.push({
      label: 'Guide',
      amount: totalGuideAmount,
      originalPrice: guideFee,
      discount: null,
      guestCount: 1,
      isFree: isFree,
      pricePerPerson: guideFee,
      type: 'guide',
    });
  }

  return breakdown;
};

export const calculateTotalAmount = (
  breakdown: PriceBreakdownItem[]
): number => {
  return breakdown.reduce((total, item) => total + item.amount, 0);
};

export const calculateTax = (
  subtotal: number,
  taxRate: number = 0.05
): number => {
  return subtotal * taxRate;
};

export const formatPriceBreakdownForDisplay = (
  breakdown: PriceBreakdownItem[],
  currency: string = 'USD',
  numberOfNights?: number
): Array<{ label: string; amount: string; discount?: string }> => {
  const formattedBreakdown = breakdown.map(item => {
    if (item.type === 'nights') {
      return {
        label: item.label,
        amount: `${item.guestCount}`,
      };
    }

    if (item.type === 'extra') {
      const result: { label: string; amount: string; discount?: string } = {
        label: item.label,
        amount: item.isFree ? 'Free' : `${currency} ${item.amount.toFixed(0)}`,
      };
      return result;
    }

    if (item.type === 'transportation') {
      const result: { label: string; amount: string; discount?: string } = {
        label: item.label,
        amount: item.isFree ? 'Free' : `${currency} ${item.amount.toFixed(0)}`,
      };
      return result;
    }

    if (item.type === 'guide') {
      const result: { label: string; amount: string; discount?: string } = {
        label: item.label,
        amount: item.isFree ? 'Free' : `${currency} ${item.amount.toFixed(0)}`,
      };
      return result;
    }

    const guestTypeName = item.label.split(' (')[0].toLowerCase();

    if (item.isFree) {
      return {
        label: `Free x ${item.guestCount} ${guestTypeName}`,
        amount: 'Free',
      };
    }

    const result: { label: string; amount: string; discount?: string } = {
      label: `${currency} ${item.pricePerPerson.toFixed(0)} x ${item.guestCount} ${guestTypeName}`,
      amount: `${currency} ${item.amount.toFixed(0)}`,
    };

    if (item.discount && item.discount > 0) {
      // Show original price in label and discount info
      result.label = `${currency} ${item.originalPrice.toFixed(0)} x ${item.guestCount} ${guestTypeName}`;
      result.discount = `Discounted to ${currency} ${item.pricePerPerson.toFixed(0)} each`;
    }

    return result;
  });

  return formattedBreakdown;
};

export const calculateGrandTotal = (
  breakdown: PriceBreakdownItem[]
): number => {
  return calculateTotalAmount(breakdown);
};
