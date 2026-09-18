import { getSupabase, isSupabaseConfigured } from '../config/supabase';

export interface UploadFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export const uploadBusinessImage = async (
  file: UploadFile,
  businessId: string,
  folder: 'gallery' | 'products' | 'cover' = 'gallery'
): Promise<string> => {
  const supabase = getSupabase();
  const fileExt = file.originalname.split('.').pop() || 'jpg';
  const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `businesses/${businessId}/${folder}/${cleanFileName}`;

  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.storage
        .from('business-images')
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) {
        console.error('[StorageService] Supabase upload error:', error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('business-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.warn('[StorageService] Supabase upload failed, falling back to base64 data URI:', err);
    }
  }

  // Fallback: Return Data URI so uploaded image immediately displays in UI
  const base64 = file.buffer.toString('base64');
  return `data:${file.mimetype};base64,${base64}`;
};
