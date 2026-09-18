import { api } from './api';
import { Category } from '../types/category';
import { ApiResponse } from '../types/api';
import { getClientCategories, getClientCategoryBySlug } from '../data/clientDirectoryStore';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get<ApiResponse<Category[]>>('/categories');
      if (response.data && response.data.data && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (err) {
      console.warn('API /categories unavailable, using local category store:', err);
    }
    return getClientCategories();
  },

  async getCategoryBySlug(slug: string): Promise<Category> {
    try {
      const response = await api.get<ApiResponse<Category>>(`/categories/${slug}`);
      if (response.data && response.data.data) {
        return response.data.data;
      }
    } catch (err) {
      console.warn(`API /categories/${slug} unavailable, using local category store:`, err);
    }
    const localCat = getClientCategoryBySlug(slug);
    if (!localCat) {
      throw new Error(`Category ${slug} not found`);
    }
    return localCat;
  },
};

