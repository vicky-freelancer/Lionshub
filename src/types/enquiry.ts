export interface Enquiry {
  id?: string;
  business_id: string;
  customer_name: string;
  customer_phone: string;
  message: string;
  created_at?: string;
}

export interface EnquiryInput {
  business_id: string;
  customer_name: string;
  customer_phone: string;
  message: string;
}
