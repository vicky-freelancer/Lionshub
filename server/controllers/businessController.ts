import { Request, Response, NextFunction } from 'express';
import { getSupabase, isSupabaseConfigured } from '../config/supabase';
import { memoryDb } from '../data/fallbackStore';
import { uploadBusinessImage } from '../services/storageService';
import { Business, BusinessService, BusinessProduct, BusinessImage } from '../../src/types/business';

export const getBusinesses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const categorySlug = (req.query.categorySlug as string) || (req.query.category as string) || undefined;
    const categoryId = req.query.categoryId as string | undefined;
    const city = req.query.city as string | undefined;

    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      let query = supabase
        .from('businesses')
        .select(`
          *,
          category:categories(*),
          services:business_services(*),
          products:business_products(*),
          images:business_images(*)
        `, { count: 'exact' });

      if (categorySlug) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .ilike('slug', categorySlug)
          .single();
        if (catData?.id) {
          query = query.eq('category_id', catData.id);
        }
      } else if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (city) {
        query = query.ilike('city', `%${city.trim()}%`);
      }

      const offset = (page - 1) * limit;
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const total = count || 0;
      const totalPages = Math.ceil(total / limit) || 1;

      res.json({
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      });
      return;
    }

    // In-memory fallback
    const result = memoryDb.getBusinesses({
      categorySlug,
      categoryId,
      city,
      page,
      limit,
    });

    res.json({
      success: true,
      data: result.businesses,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const searchBusinesses = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const q = ((req.query.q as string) || '').trim();
    const categorySlug = (req.query.categorySlug as string) || (req.query.category as string) || undefined;
    const categoryId = req.query.categoryId as string | undefined;
    const city = req.query.city as string | undefined;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;

    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      // In Supabase, search across businesses, services, products
      let query = supabase
        .from('businesses')
        .select(`
          *,
          category:categories(*),
          services:business_services(*),
          products:business_products(*),
          images:business_images(*)
        `, { count: 'exact' });

      if (categorySlug) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .ilike('slug', categorySlug)
          .single();
        if (catData?.id) {
          query = query.eq('category_id', catData.id);
        }
      } else if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (city) {
        query = query.ilike('city', `%${city.trim()}%`);
      }

      if (q) {
        query = query.or(`name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%`);
      }

      const offset = (page - 1) * limit;
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const total = count || 0;
      const totalPages = Math.ceil(total / limit) || 1;

      res.json({
        success: true,
        data: data || [],
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      });
      return;
    }

    const result = memoryDb.searchBusinesses({
      query: q,
      categorySlug,
      categoryId,
      city,
      page,
      limit,
    });

    res.json({
      success: true,
      data: result.businesses,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getBusinessById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          category:categories(*),
          services:business_services(*),
          products:business_products(*),
          images:business_images(*)
        `)
        .eq('id', id)
        .single();

      if (error || !data) {
        res.status(404).json({
          success: false,
          message: 'Business not found',
        });
        return;
      }

      res.json({
        success: true,
        data,
      });
      return;
    }

    const business = memoryDb.getBusinessById(id);
    if (!business) {
      res.status(404).json({
        success: false,
        message: 'Business not found',
      });
      return;
    }

    res.json({
      success: true,
      data: business,
    });
  } catch (error) {
    next(error);
  }
};

export const createBusiness = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = req.body;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

    // Validate required fields
    const name = body.name?.trim();
    const phone = body.phone?.trim();
    const city = body.city?.trim();
    const categoryId = body.category_id || body.categoryId;

    if (!name || !phone || !city) {
      res.status(400).json({
        success: false,
        message: 'Business Name, Phone Number, and City are required fields.',
      });
      return;
    }

    const businessId = 'b-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);

    // Parse services
    let servicesList: BusinessService[] = [];
    if (typeof body.services === 'string') {
      try {
        servicesList = JSON.parse(body.services);
      } catch {
        servicesList = [];
      }
    } else if (Array.isArray(body.services)) {
      servicesList = body.services;
    }

    // Parse products
    let productsList: BusinessProduct[] = [];
    if (typeof body.products === 'string') {
      try {
        productsList = JSON.parse(body.products);
      } catch {
        productsList = [];
      }
    } else if (Array.isArray(body.products)) {
      productsList = body.products;
    }

    // Handle Uploaded Images
    let galleryUrls: string[] = [];
    if (body.images) {
      if (typeof body.images === 'string') {
        try {
          galleryUrls = JSON.parse(body.images);
        } catch {
          galleryUrls = [body.images];
        }
      } else if (Array.isArray(body.images)) {
        galleryUrls = body.images;
      }
    }

    // Upload files if provided via multipart
    if (files) {
      if (files.galleryImages) {
        for (const file of files.galleryImages) {
          const url = await uploadBusinessImage(file, businessId, 'gallery');
          galleryUrls.push(url);
        }
      }
      if (files.coverImage && files.coverImage[0]) {
        const coverUrl = await uploadBusinessImage(files.coverImage[0], businessId, 'cover');
        body.cover_image = coverUrl;
      }
    }

    const coverImage = body.cover_image || (galleryUrls.length > 0 ? galleryUrls[0] : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80');

    const newBusiness: Business = {
      id: businessId,
      name,
      description: body.description?.trim() || '',
      category_id: categoryId || 'c1111111-1111-1111-1111-111111111111',
      address: body.address?.trim() || '',
      city,
      latitude: body.latitude ? parseFloat(body.latitude) : undefined,
      longitude: body.longitude ? parseFloat(body.longitude) : undefined,
      phone,
      whatsapp: body.whatsapp?.trim() || phone,
      opening_hours: body.opening_hours?.trim() || 'Mon - Sat: 9:00 AM - 7:00 PM',
      cover_image: coverImage,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      services: servicesList.map(s => ({
        id: 's-' + Math.random().toString(36).substring(2, 7),
        business_id: businessId,
        name: s.name,
        description: s.description || '',
      })),
      products: productsList.map(p => ({
        id: 'p-' + Math.random().toString(36).substring(2, 7),
        business_id: businessId,
        name: p.name,
        description: p.description || '',
        price: p.price ? Number(p.price) : 0,
        image_url: p.image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
      })),
      images: galleryUrls.map(imgUrl => ({
        id: 'img-' + Math.random().toString(36).substring(2, 7),
        business_id: businessId,
        image_url: imgUrl,
      })),
    };

    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      // 1. Insert business
      const { data: bData, error: bError } = await supabase
        .from('businesses')
        .insert({
          name: newBusiness.name,
          description: newBusiness.description,
          category_id: newBusiness.category_id,
          address: newBusiness.address,
          city: newBusiness.city,
          latitude: newBusiness.latitude,
          longitude: newBusiness.longitude,
          phone: newBusiness.phone,
          whatsapp: newBusiness.whatsapp,
          opening_hours: newBusiness.opening_hours,
          cover_image: newBusiness.cover_image,
        })
        .select()
        .single();

      if (bError) throw bError;

      const insertedBusinessId = bData.id;

      // 2. Insert Services
      if (newBusiness.services && newBusiness.services.length > 0) {
        const servicesPayload = newBusiness.services.map(s => ({
          business_id: insertedBusinessId,
          name: s.name,
          description: s.description,
        }));
        await supabase.from('business_services').insert(servicesPayload);
      }

      // 3. Insert Products
      if (newBusiness.products && newBusiness.products.length > 0) {
        const productsPayload = newBusiness.products.map(p => ({
          business_id: insertedBusinessId,
          name: p.name,
          description: p.description,
          price: p.price,
          image_url: p.image_url,
        }));
        await supabase.from('business_products').insert(productsPayload);
      }

      // 4. Insert Images
      if (newBusiness.images && newBusiness.images.length > 0) {
        const imagesPayload = newBusiness.images.map(img => ({
          business_id: insertedBusinessId,
          image_url: img.image_url,
        }));
        await supabase.from('business_images').insert(imagesPayload);
      }

      newBusiness.id = insertedBusinessId;
    } else {
      // In memory fallback
      memoryDb.addBusiness(newBusiness);
    }

    res.status(201).json({
      success: true,
      message: 'Business listed successfully!',
      data: newBusiness,
    });
  } catch (error) {
    next(error);
  }
};
