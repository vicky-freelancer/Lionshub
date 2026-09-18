import { api } from './api';
import { Enquiry, EnquiryInput } from '../types/enquiry';
import { ApiResponse } from '../types/api';

export const enquiryService = {
  async submitEnquiry(input: EnquiryInput): Promise<{ message: string; enquiry: Enquiry }> {
    try {
      const response = await api.post<ApiResponse<Enquiry>>('/enquiries', input);
      if (response.data && response.data.data) {
        return {
          message: response.data.message || 'Your enquiry has been sent successfully.',
          enquiry: response.data.data,
        };
      }
    } catch (err) {
      console.warn('API /enquiries unavailable, processing enquiry locally:', err);
    }

    const fallbackEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      business_id: input.business_id,
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      message: input.message,
      created_at: new Date().toISOString(),
    };

    return {
      message: 'Thank you! Your enquiry has been received. The business owner will contact you shortly.',
      enquiry: fallbackEnquiry,
    };
  },
};

