export type ReceiptCouponData = {
  coupon_id: number;
  issue_id: number;
  partner: {
    business_name: string;
    owner_name?: string;
    owner_phone: string;
    address?: string;
  };
  product: {
    product_name: string;
  };
  vendor?: {
    vendor_name: string;
    president_name?: string;
    president_phone?: string;
  };
  register: {
    name: string;
    phone: string;
  };
  registered_at: string;
  payment_code: string;
  payment_id?: number;
  paid_qrimage?: string | null;
};
