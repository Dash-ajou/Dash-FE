export type VendorInfo = {
  general_id: number;
  general_name: string;
  general_email: string | null;
  vendor_group_id: number;
  department_id: number;
  joined_at: string;
  general_new_phone?: string;
  general_verify_code?: string;
  new_email?: string;
  email_verify_code?: string;
  general_phone?: string;
};

export type GeneralUserInfo = {
  general_id: number;
  general_name: string;
  general_email: string | null;
  general_phone: string;
  vendor_group_id: number;
  department_id: number;
  joined_at: string;
  general_new_phone?: string;
  general_verify_code?: string;
  new_email?: string;
  email_verify_code?: string;
};

export type ProductInfo = {
  product_id: number;
  partner_id: number;
  product_name: string;
  price: number;
};

export type PartnerInfo = {
  partner_id: number;
  partner_name: string;
  business_name?: string;
  owner_name: string;
  owner_phone: string;
  owner_email?: string;
  partner_adress: string;
  is_temporary: boolean;
  temporary_register_date: string;
  owner_new_phone: string;
  owner_verify_code: string;
  partner_status: "active" | "paused";
};
