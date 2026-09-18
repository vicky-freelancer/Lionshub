import { Request, Response, NextFunction } from 'express';
import { getSupabase, isSupabaseConfigured } from '../config/supabase';
import { memoryDb } from '../data/fallbackStore';

export const getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*, businesses(count)')
        .order('name', { ascending: true });

      if (error) {
        throw error;
      }

      const formatted = (data || []).map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        icon: cat.icon,
        image_url: cat.image_url,
        created_at: cat.created_at,
        business_count: cat.businesses ? cat.businesses[0]?.count || 0 : 0,
      }));

      res.json({
        success: true,
        data: formatted,
      });
      return;
    }

    const categories = memoryDb.getCategories();
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .ilike('slug', slug)
        .single();

      if (error || !data) {
        res.status(404).json({
          success: false,
          message: `Category '${slug}' not found`,
        });
        return;
      }

      res.json({
        success: true,
        data,
      });
      return;
    }

    const category = memoryDb.getCategoryBySlug(slug);
    if (!category) {
      res.status(404).json({
        success: false,
        message: `Category '${slug}' not found`,
      });
      return;
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};
