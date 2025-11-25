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

export const getMUACColorClass = (muac: number) => {
  if (muac >= MUAC_THRESHOLDS.NORMAL) {
    return 'bg-success';
  }

  if (muac >= MUAC_THRESHOLDS.MODERATE) {
    return 'bg-warning';
  }

  return 'bg-destructive';
};

export const filterChildrenByQuery = (children: ChildRecord[], query: string) => {
  if (!query.trim()) {
    return children;
  }

  return children.filter((child) => {
    return hasSubString(child.name, query) || hasSubString(child.serial, query);
  });
};
