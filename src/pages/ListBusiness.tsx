import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Wrench,
} from 'lucide-react';
import { Category } from '../types/category';
import { categoryService } from '../services/categoryService';
import { businessService } from '../services/businessService';

interface DynamicService {
  name: string;
  description: string;
}

interface DynamicProduct {
  name: string;
  description: string;
  price: string;
  image_url: string;
}

export const ListBusiness: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Trichy');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [openingHours, setOpeningHours] = useState('Mon - Sat: 9:00 AM - 7:00 PM');

  // Dynamic services & products
  const [services, setServices] = useState<DynamicService[]>([
    { name: '', description: '' },
  ]);
  const [products, setProducts] = useState<DynamicProduct[]>([]);

  // File uploads
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  // Submission state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdBusinessId, setCreatedBusinessId] = useState<string | null>(null);

  useEffect(() => {
    categoryService
      .getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setCategoryId(data[0].id);
      })
      .catch(console.error);
  }, []);

  // Services handlers
  const handleAddService = () => {
    setServices([...services, { name: '', description: '' }]);
  };

  const handleRemoveService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleServiceChange = (index: number, field: keyof DynamicService, value: string) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  // Products handlers
  const handleAddProduct = () => {
    setProducts([...products, { name: '', description: '', price: '', image_url: '' }]);
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleProductChange = (index: number, field: keyof DynamicProduct, value: string) => {
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  // Gallery image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray: File[] = Array.from(e.target.files);
      const validFiles = filesArray.filter((file: File) =>
        ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)
      );

      setGalleryFiles((prev) => [...prev, ...validFiles]);

      validFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !city.trim() || !categoryId) {
      setError('Please fill in all mandatory fields: Business Name, Category, City, and Phone.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('category_id', categoryId);
      formData.append('address', address.trim());
      formData.append('city', city.trim());
      formData.append('phone', phone.trim());
      formData.append('whatsapp', whatsapp.trim() || phone.trim());
      formData.append('opening_hours', openingHours.trim());

      // Filter valid services
      const validServices = services.filter((s) => s.name.trim() !== '');
      formData.append('services', JSON.stringify(validServices));

      // Filter valid products
      const validProducts = products
        .filter((p) => p.name.trim() !== '')
        .map((p) => ({
          name: p.name.trim(),
          description: p.description.trim(),
          price: p.price ? parseFloat(p.price) : 0,
          image_url: p.image_url.trim() || undefined,
        }));
      formData.append('products', JSON.stringify(validProducts));

      // Append uploaded images
      galleryFiles.forEach((file) => {
        formData.append('galleryImages', file);
      });

      const result = await businessService.createBusiness(formData);
      setCreatedBusinessId(result.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Failed to list business. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (createdBusinessId) {
    return (
      <div id="list-business-success" className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Business Successfully Listed!
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-md mx-auto">
          <span className="font-semibold text-neutral-900">{name}</span> is now published and publicly discoverable in the community business directory.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            id="view-new-business-btn"
            to={`/business/${createdBusinessId}`}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>View Business Page</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-sm transition-all text-center"
          >
            Back to Directory Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="list-business-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Public Community Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          List Your Business for Free
        </h1>
        <p className="text-sm sm:text-base text-neutral-600">
          No sign up or subscription required. Reach local neighbors looking for your services and products.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Listing Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* SECTION 1: BASIC BUSINESS INFORMATION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <span>1. Business Details</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                Business Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-business-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Kaveri Electricals & AC Services"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="select-business-category"
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 bg-white focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                City / Locality <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-business-city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Trichy (Thillai Nagar / Srirangam / Cantonment / KK Nagar)"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                Street Address / Location
              </label>
              <input
                id="input-business-address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 11th Cross East, Thillai Nagar, Trichy"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                About the Business (Description)
              </label>
              <textarea
                id="input-business-description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your specialties, background, team experience, or unique offerings..."
                className="w-full p-3.5 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: CONTACT & OPERATING HOURS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Phone className="w-5 h-5 text-emerald-600" />
            <span>2. Contact & Hours</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                Phone Number (Calls) <span className="text-rose-500">*</span>
              </label>
              <input
                id="input-business-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 512-555-0182"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                WhatsApp Number (Optional)
              </label>
              <input
                id="input-business-whatsapp"
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. +15125550182 (defaults to phone)"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                Operating Hours
              </label>
              <input
                id="input-business-hours"
                type="text"
                value={openingHours}
                onChange={(e) => setOpeningHours(e.target.value)}
                placeholder="e.g. Mon - Sat: 8:00 AM - 7:00 PM"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: SERVICES OFFERED */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-emerald-600" />
              <span>3. Services Offered</span>
            </h2>
            <button
              id="add-service-btn"
              type="button"
              onClick={handleAddService}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Service</span>
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            List specific services you provide (e.g. AC Gas Refill, Sourdough Bread Subscription, Hair Smoothing).
          </p>

          <div className="space-y-4">
            {services.map((srv, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-600">Service #{idx + 1}</span>
                  {services.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveService(idx)}
                      className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove service"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={srv.name}
                    onChange={(e) => handleServiceChange(idx, 'name', e.target.value)}
                    placeholder="Service Name (e.g. Brake Pad Replacement)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                  />
                  <input
                    type="text"
                    value={srv.description}
                    onChange={(e) => handleServiceChange(idx, 'description', e.target.value)}
                    placeholder="Short description or scope"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: PRODUCTS CATALOG */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <span>4. Products (Optional)</span>
            </h2>
            <button
              id="add-product-btn"
              type="button"
              onClick={handleAddProduct}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <p className="text-xs text-neutral-500">
            If you sell retail items, baked goods, parts, or tools, add them here.
          </p>

          {products.length === 0 ? (
            <div className="text-center py-6 border-2 border-dashed border-neutral-200 rounded-2xl">
              <ShoppingBag className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
              <p className="text-xs text-neutral-500 mb-2">No products added yet.</p>
              <button
                type="button"
                onClick={handleAddProduct}
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                + Add your first product
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((prod, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-600">Product #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(idx)}
                      className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={prod.name}
                      onChange={(e) => handleProductChange(idx, 'name', e.target.value)}
                      placeholder="Product Name"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={prod.price}
                      onChange={(e) => handleProductChange(idx, 'price', e.target.value)}
                      placeholder="Price ($)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                    />
                    <input
                      type="url"
                      value={prod.image_url}
                      onChange={(e) => handleProductChange(idx, 'image_url', e.target.value)}
                      placeholder="Image URL (optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                    />
                  </div>

                  <input
                    type="text"
                    value={prod.description}
                    onChange={(e) => handleProductChange(idx, 'description', e.target.value)}
                    placeholder="Short product description"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-neutral-300 text-xs text-neutral-900 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 5: PHOTOS & GALLERY UPLOADS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-2xs space-y-6">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 border-b border-neutral-100 pb-3">
            <ImageIcon className="w-5 h-5 text-emerald-600" />
            <span>5. Business Photos</span>
          </h2>

          <p className="text-xs text-neutral-500">
            Upload photos of your storefront, workshop, recent client projects, or team (JPG, PNG, WebP).
          </p>

          <label className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 hover:bg-emerald-50/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors block">
            <Upload className="w-8 h-8 text-neutral-400 mb-2" />
            <span className="text-sm font-semibold text-neutral-800">
              Click to select or drag and drop images
            </span>
            <span className="text-xs text-neutral-500 mt-1">
              Supports JPG, PNG, and WebP (up to 10MB per file)
            </span>
            <input
              id="upload-business-photos-input"
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {galleryPreviews.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-neutral-600">Selected Photos ({galleryPreviews.length}):</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {galleryPreviews.map((preview, idx) => (
                  <div key={idx} className="relative h-24 rounded-xl overflow-hidden border border-neutral-200 group">
                    <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute top-1.5 right-1.5 p-1 bg-black/70 hover:bg-rose-600 text-white rounded-md transition-colors"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            id="submit-business-listing-btn"
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Publishing Listing to Supabase...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Publish Business Listing</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
