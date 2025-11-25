import { MUAC_THRESHOLDS } from '@/constants/assessment';
import { hasSubString } from '@/helpers/string';

export type ChildRecord = {
  id: string;
  name: string;
  serial: string;
  photo: string;
  age: number;
  muac: number;
  visits: number;
  lastVisit: string;
  sachetsIssued: number;
  vaccineStatus: string;
};

export type MUACColorToken = 'success' | 'warning' | 'destructive';

export const getMUACColorToken = (muac: number): MUACColorToken => {
  if (muac >= MUAC_THRESHOLDS.NORMAL) {
    return 'success';
  }

  if (muac >= MUAC_THRESHOLDS.MODERATE) {
    return 'warning';
  }

  return 'destructive';
};

export const withOpacity = (hex: string, alpha: number) => {
  if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
    return hex;
  }

  let normalized = hex.slice(1);
  if (normalized.length === 3) {
    normalized = normalized
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (normalized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const filterChildrenByQuery = (children: ChildRecord[], query: string) => {
  if (!query.trim()) {
    return children;
  }

  return children.filter((child) => {
    return hasSubString(child.name, query) || hasSubString(child.serial, query);
  });
};
