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

interface PriceBreakdownItem {
  label: string;
  amount: number;
  originalPrice: number;
  discount: number | null;
  guestCount: number;
  isFree: boolean;
  pricePerPerson: number;
}

export const calculatePriceBreakdown = (
  pricingInformation: PricingInfo[],
  guests: GuestData,
): PriceBreakdownItem[] => {
  const breakdown: PriceBreakdownItem[] = [];

  // Process each guest type
  Object.entries(guests).forEach(([guestType, guestCount]) => {
    if (!guestCount || guestCount <= 0) return;

    // Find all pricing options for this guest type
    const guestTypePricing = pricingInformation.filter(
      (pricing) => pricing.personType === guestType,
    );

    if (guestTypePricing.length === 0) return;

    // Find the appropriate pricing tier based on guest count
    const applicablePricing = guestTypePricing.find(
      (pricing) =>
        guestCount >= pricing.minUnit && guestCount <= pricing.maxUnit,
    );

    if (!applicablePricing) return;

    const originalPrice = applicablePricing.price;
    const discount = applicablePricing.discount;
    const isFree = originalPrice === 0;

    // Calculate final price per person
    let finalPricePerPerson = originalPrice;
    if (discount && discount > 0) {
      finalPricePerPerson = originalPrice - (originalPrice * discount) / 100;
    }

    // Calculate total amount for this guest type
    const totalAmount = finalPricePerPerson * guestCount;

    breakdown.push({
      label: `${guestType.charAt(0).toUpperCase() + guestType.slice(1)} (${guestCount})`,
      amount: totalAmount,
      originalPrice: originalPrice,
      discount: discount,
      guestCount: guestCount,
      isFree: isFree,
      pricePerPerson: finalPricePerPerson,
    });
  });

  return breakdown;
};

export const calculateTotalAmount = (
  breakdown: PriceBreakdownItem[],
): number => {
  return breakdown.reduce((total, item) => total + item.amount, 0);
};

export const calculateTax = (
  subtotal: number,
  taxRate: number = 0.05, // Default 5% tax rate
): number => {
  return subtotal * taxRate;
};

export const formatPriceBreakdownForDisplay = (
  breakdown: PriceBreakdownItem[],
  currency: string = 'JOD',
  includeTax: boolean = true,
  taxRate: number = 0.05,
): Array<{ label: string; amount: string; discount?: string }> => {
  const formattedBreakdown = breakdown.map((item) => {
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
      result.discount = `${item.discount}% off`;
    }

    return result;
  });

  // Add tax if requested
  if (includeTax) {
    const subtotal = calculateTotalAmount(breakdown);
    const tax = calculateTax(subtotal, taxRate);

    formattedBreakdown.push({
      label: 'Tax',
      amount: `${currency} ${tax.toFixed(0)}`,
    });
  }

  return formattedBreakdown;
};

export const calculateGrandTotal = (
  breakdown: PriceBreakdownItem[],
  taxRate: number = 0.05,
): number => {
  const subtotal = calculateTotalAmount(breakdown);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};
