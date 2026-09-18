import { Request, Response, NextFunction } from 'express';
import { getSupabase, isSupabaseConfigured } from '../config/supabase';
import { memoryDb } from '../data/fallbackStore';
import { Enquiry } from '../../src/types/enquiry';

export const createEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { business_id, customer_name, customer_phone, message } = req.body;

    if (!business_id || !customer_name?.trim() || !customer_phone?.trim() || !message?.trim()) {
      res.status(400).json({
        success: false,
        message: 'Business ID, Your Name, Phone Number, and Requirement/Message are required.',
      });
      return;
    }

    const newEnquiry: Enquiry = {
      business_id,
      customer_name: customer_name.trim(),
      customer_phone: customer_phone.trim(),
      message: message.trim(),
    };

    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .insert(newEnquiry)
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        message: 'Your enquiry has been sent successfully. The business may contact you soon.',
        data,
      });
      return;
    }

    const saved = memoryDb.addEnquiry(newEnquiry);
    res.status(201).json({
      success: true,
      message: 'Your enquiry has been sent successfully. The business may contact you soon.',
      data: saved,
    });
  } catch (error) {
    next(error);
  }
};

export const getBusinessEnquiries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const supabase = getSupabase();

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .eq('business_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      res.json({
        success: true,
        data: data || [],
      });
      return;
    }

    const enquiries = memoryDb.getEnquiriesForBusiness(id);
    res.json({
      success: true,
      data: enquiries,
    });
  } catch (error) {
    next(error);
  }
};
