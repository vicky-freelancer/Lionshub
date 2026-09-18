import React from 'react';
import {
  Wrench,
  UtensilsCrossed,
  Stethoscope,
  Car,
  Sparkles,
  GraduationCap,
  ShoppingBag,
  Briefcase,
  Store,
  TrendingUp,
  School,
  Laptop,
  Tv,
  Calculator,
  HardHat,
  HandCoins,
  CandlestickChart,
  Building,
  Receipt,
  Banknote,
  LineChart,
  BookOpenCheck,
  Building2,
} from 'lucide-react';

interface CategoryIconProps {
  name?: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ name, className = 'w-5 h-5' }) => {
  const iconName = name?.toLowerCase() || '';

  if (iconName.includes('mutual fund') || iconName.includes('fund') || iconName.includes('trendingup')) {
    return <TrendingUp className={className} />;
  }
  if (iconName.includes('share') || iconName.includes('stock') || iconName.includes('candlestick') || iconName.includes('trading')) {
    return <CandlestickChart className={className} />;
  }
  if (iconName.includes('distance') || iconName.includes('laptop') || iconName.includes('online degree') || iconName.includes('open university')) {
    return <Laptop className={className} />;
  }
  if (iconName.includes('school') || iconName.includes('matriculation') || iconName.includes('academy')) {
    return <School className={className} />;
  }
  if (iconName.includes('audio') || iconName.includes('visual') || iconName.includes('tv') || iconName.includes('projector') || iconName.includes('sound')) {
    return <Tv className={className} />;
  }
  if (iconName.includes('auditor') || iconName.includes('tax') || iconName.includes('gst') || iconName.includes('calculator') || iconName.includes('accounting')) {
    return <Calculator className={className} />;
  }
  if (iconName.includes('contractor') || iconName.includes('hardhat') || iconName.includes('civil') || iconName.includes('construction')) {
    return <HardHat className={className} />;
  }
  if (iconName.includes('loan') || iconName.includes('handcoins') || iconName.includes('credit') || iconName.includes('finance')) {
    return <HandCoins className={className} />;
  }
  if (iconName.includes('wrench') || iconName.includes('home') || iconName.includes('repair')) {
    return <Wrench className={className} />;
  }
  if (iconName.includes('utensils') || iconName.includes('food') || iconName.includes('restaurant') || iconName.includes('bakery')) {
    return <UtensilsCrossed className={className} />;
  }
  if (iconName.includes('stethoscope') || iconName.includes('health') || iconName.includes('medical') || iconName.includes('doctor')) {
    return <Stethoscope className={className} />;
  }
  if (iconName.includes('car') || iconName.includes('automotive') || iconName.includes('vehicle')) {
    return <Car className={className} />;
  }
  if (iconName.includes('sparkles') || iconName.includes('beauty') || iconName.includes('spa') || iconName.includes('wellness')) {
    return <Sparkles className={className} />;
  }
  if (iconName.includes('graduation') || iconName.includes('education') || iconName.includes('tutor') || iconName.includes('coaching')) {
    return <GraduationCap className={className} />;
  }
  if (iconName.includes('shopping') || iconName.includes('retail') || iconName.includes('store')) {
    return <ShoppingBag className={className} />;
  }
  if (iconName.includes('briefcase') || iconName.includes('professional') || iconName.includes('service') || iconName.includes('legal')) {
    return <Briefcase className={className} />;
  }
  if (iconName.includes('building')) {
    return <Building2 className={className} />;
  }

  return <Store className={className} />;
};

