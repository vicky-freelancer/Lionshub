import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { BusinessService } from '../../types/business';

interface ServiceListProps {
  services?: BusinessService[];
}

export const ServiceList: React.FC<ServiceListProps> = ({ services = [] }) => {
  if (!services || services.length === 0) {
    return (
      <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-sm text-neutral-500">
        No specific service breakdown listed yet. Contact business directly for full service inquiries.
      </div>
    );
  }

  return (
    <div id="services-list-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {services.map((service, index) => (
        <div
          key={service.id || index}
          className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs hover:border-emerald-200 hover:bg-emerald-50/20 transition-all flex items-start gap-3"
        >
          <div className="p-1.5 rounded-lg bg-emerald-100/80 text-emerald-700 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-1">{service.name}</h4>
            {service.description && (
              <p className="text-xs text-neutral-600 leading-relaxed">{service.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
