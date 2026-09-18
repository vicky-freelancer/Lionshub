import { Category } from '../types/category';
import { Business, BusinessService, BusinessProduct, BusinessImage } from '../types/business';
import { initialCategories, initialBusinesses } from './initialDirectoryData';

const LOCAL_STORAGE_KEY = 'lionshub_user_businesses_v1';

function getStoredUserBusinesses(): Business[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Could not read user businesses from localStorage:', err);
    return [];
  }
}

export function saveUserBusinessToLocalStorage(business: Business): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredUserBusinesses();
    const updated = [business, ...current.filter((b) => b.id !== business.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save business to localStorage:', err);
  }
}

export function getAllClientBusinesses(): Business[] {
  const userBizs = getStoredUserBusinesses();
  // Merge user submitted businesses on top of initial businesses
  const initialIds = new Set(userBizs.map((b) => b.id));
  const remainingInitial = initialBusinesses.filter((b) => !initialIds.has(b.id));
  return [...userBizs, ...remainingInitial];
}

export function getClientCategories(): Category[] {
  return initialCategories;
}

export function getClientCategoryBySlug(slug: string): Category | undefined {
  return initialCategories.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id === slug
  );
}

export function queryClientBusinesses(params: {
  q?: string;
  category?: string;
  categorySlug?: string;
  categoryId?: string;
  city?: string;
  page?: number;
  limit?: number;
}): { businesses: Business[]; total: number } {
  let list = getAllClientBusinesses();

  // Filter by category slug or category ID
  if (params.categorySlug) {
    const matchedCategory = getClientCategoryBySlug(params.categorySlug);
    if (matchedCategory) {
      list = list.filter(
        (b) => b.category_id === matchedCategory.id || b.category?.slug === params.categorySlug
      );
    }
  } else if (params.categoryId) {
    list = list.filter(
      (b) => b.category_id === params.categoryId || b.category?.id === params.categoryId
    );
  } else if (params.category && params.category !== 'all') {
    list = list.filter(
      (b) =>
        b.category_id === params.category ||
        b.category?.slug === params.category ||
        b.category?.name.toLowerCase().includes(params.category!.toLowerCase())
    );
  }

  // Filter by City / Locality if specified
  if (params.city && params.city !== 'All' && params.city !== 'Trichy' && params.city !== 'all') {
    const cityLower = params.city.toLowerCase().trim();
    list = list.filter(
      (b) =>
        (b.city && b.city.toLowerCase().includes(cityLower)) ||
        (b.address && b.address.toLowerCase().includes(cityLower))
    );
  }

  // Filter by Search Query
  if (params.q && params.q.trim()) {
    const qLower = params.q.toLowerCase().trim();
    list = list.filter((b) => {
      const nameMatch = b.name.toLowerCase().includes(qLower);
      const descMatch = b.description.toLowerCase().includes(qLower);
      const addrMatch = b.address ? b.address.toLowerCase().includes(qLower) : false;
      const catMatch = b.category?.name ? b.category.name.toLowerCase().includes(qLower) : false;
      const srvMatch = b.services?.some((s) => s.name.toLowerCase().includes(qLower) || s.description.toLowerCase().includes(qLower));
      const prdMatch = b.products?.some((p) => p.name.toLowerCase().includes(qLower) || p.description.toLowerCase().includes(qLower));
      return nameMatch || descMatch || addrMatch || catMatch || srvMatch || prdMatch;
    });
  }

  const total = list.length;
  const page = params.page || 1;
  const limit = params.limit || 20;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return { businesses: paginated, total };
}

export function getClientBusinessById(id: string): Business | undefined {
  const all = getAllClientBusinesses();
  return all.find((b) => b.id === id);
}
