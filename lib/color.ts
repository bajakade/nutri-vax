const parseHex = (value: string) => {
  const hex = value.replace('#', '');
  if (hex.length === 3) {
    return [
      parseInt(hex[0] + hex[0], 16),
      parseInt(hex[1] + hex[1], 16),
      parseInt(hex[2] + hex[2], 16),
    ];
  }

  const normalized = hex.slice(0, 6);
  return [
    parseInt(normalized.substring(0, 2), 16),
    parseInt(normalized.substring(2, 4), 16),
    parseInt(normalized.substring(4, 6), 16),
  ];
};

const parseRgb = (value: string) => {
  const body = value.replace(/rgba?\(/, '').replace(')', '');
  const [r, g, b] = body.split(',').map((channel) => Number(channel.trim()));
  if ([r, g, b].some((channel) => Number.isNaN(channel))) {
    return null;
  }
  return [r, g, b];
};

export const withOpacity = (color: string, alpha: number) => {
  if (!color || typeof color !== 'string') {
    return null;
  }

  if (color.startsWith('#')) {
    const channels = parseHex(color);
    if (channels.some((channel) => Number.isNaN(channel))) {
      return null;
    }
    return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
  }

  if (color.startsWith('rgb')) {
    const channels = parseRgb(color);
    if (!channels) {
      return null;
    }
    return `rgba(${channels[0]}, ${channels[1]}, ${channels[2]}, ${alpha})`;
  }

  return null;
};
