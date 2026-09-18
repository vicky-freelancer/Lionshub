import { api } from './api';
import { Business } from '../types/business';
import { ApiResponse } from '../types/api';
import {
  queryClientBusinesses,
  getClientBusinessById,
  saveUserBusinessToLocalStorage,
  getClientCategories,
} from '../data/clientDirectoryStore';

export interface BusinessQueryParams {
  q?: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  city?: string;
  page?: number;
  limit?: number;
}

export interface BusinessListResult {
  businesses: Business[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const businessService = {
  async getBusinesses(params: BusinessQueryParams = {}): Promise<BusinessListResult> {
    try {
      const response = await api.get<ApiResponse<Business[]>>('/businesses', { params });
      if (response.data && response.data.data && response.data.data.length > 0) {
        return {
          businesses: response.data.data,
          pagination: response.data.pagination || {
            page: params.page || 1,
            limit: params.limit || 12,
            total: response.data.data.length,
            totalPages: Math.ceil(response.data.data.length / (params.limit || 12)),
          },
        };
      }
    } catch (err) {
      console.warn('API /businesses unavailable, using client directory store:', err);
    }

    const { businesses, total } = queryClientBusinesses(params);
    const limit = params.limit || 12;
    return {
      businesses,
      pagination: {
        page: params.page || 1,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async searchBusinesses(params: BusinessQueryParams = {}): Promise<BusinessListResult> {
    try {
      const response = await api.get<ApiResponse<Business[]>>('/businesses/search', { params });
      if (response.data && response.data.data && response.data.data.length > 0) {
        return {
          businesses: response.data.data,
          pagination: response.data.pagination || {
            page: params.page || 1,
            limit: params.limit || 12,
            total: response.data.data.length,
            totalPages: Math.ceil(response.data.data.length / (params.limit || 12)),
          },
        };
      }
    } catch (err) {
      console.warn('API /businesses/search unavailable, using client directory store:', err);
    }

    const { businesses, total } = queryClientBusinesses(params);
    const limit = params.limit || 12;
    return {
      businesses,
      pagination: {
        page: params.page || 1,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  },

  async getBusinessById(id: string): Promise<Business> {
    try {
      const response = await api.get<ApiResponse<Business>>(`/businesses/${id}`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn(`API /businesses/${id} unavailable, looking in client store:`, err);
    }

    const localBiz = getClientBusinessById(id);
    if (!localBiz) {
      throw new Error('Business not found in directory');
    }
    return localBiz;
  },

  async createBusiness(formData: FormData): Promise<Business> {
    try {
      const response = await api.post<ApiResponse<Business>>('/businesses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data && response.data.data) {
        saveUserBusinessToLocalStorage(response.data.data);
        return response.data.data;
      }
    } catch (err) {
      console.warn('Backend API unavailable for business creation, saving to local store:', err);
    }

    // Fallback: create business in client local storage
    const name = (formData.get('name') as string) || 'New Business';
    const description = (formData.get('description') as string) || '';
    const category_id = (formData.get('category_id') as string) || 'c1111111-1111-1111-1111-111111111111';
    const address = (formData.get('address') as string) || '';
    const city = (formData.get('city') as string) || 'Trichy';
    const phone = (formData.get('phone') as string) || '';
    const whatsapp = (formData.get('whatsapp') as string) || phone;
    const opening_hours = (formData.get('opening_hours') as string) || 'Mon - Sat: 9:00 AM - 7:00 PM';
    const cover_image =
      (formData.get('cover_image') as string) ||
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80';

    let services = [];
    try {
      const srvRaw = formData.get('services') as string;
      if (srvRaw) services = JSON.parse(srvRaw);
    } catch (e) {}

    let products = [];
    try {
      const prdRaw = formData.get('products') as string;
      if (prdRaw) products = JSON.parse(prdRaw);
    } catch (e) {}

    const categories = getClientCategories();
    const matchedCategory = categories.find((c) => c.id === category_id) || categories[0];

    const newBusiness: Business = {
      id: `local-biz-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      name,
      description,
      category_id,
      category: matchedCategory,
      address,
      city,
      latitude: 10.8285,
      longitude: 78.6820,
      phone,
      whatsapp,
      opening_hours,
      cover_image,
      created_at: new Date().toISOString(),
      services: services.map((s: any, idx: number) => ({
        id: `srv-${Date.now()}-${idx}`,
        name: s.name || 'Service',
        description: s.description || '',
      })),
      products: products.map((p: any, idx: number) => ({
        id: `prd-${Date.now()}-${idx}`,
        name: p.name || 'Product',
        description: p.description || '',
        price: Number(p.price) || 0,
        image_url: p.image_url || cover_image,
      })),
      images: [
        {
          id: `img-${Date.now()}-0`,
          image_url: cover_image,
        },
      ],
    };

    saveUserBusinessToLocalStorage(newBusiness);
    return newBusiness;
  },
};

