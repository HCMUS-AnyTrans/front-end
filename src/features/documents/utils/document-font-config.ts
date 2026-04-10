import type {
  FontCheckItem,
  FontEnabledMap,
  FontReplacement,
  FontSelectionMap,
} from '../types';

export function buildDefaultFontSelections(
  items: FontCheckItem[],
): FontSelectionMap {
  return items.reduce<FontSelectionMap>((acc, item) => {
    acc[item.from_font] = item.to_font || item.from_font;
    return acc;
  }, {});
}

export function reconcileFontEnabledMap(
  items: FontCheckItem[],
  currentEnabledMap: FontEnabledMap,
): FontEnabledMap {
  return items.reduce<FontEnabledMap>((acc, item) => {
    acc[item.from_font] = currentEnabledMap[item.from_font] ?? true;
    return acc;
  }, {});
}

export function reconcileFontSelections(
  items: FontCheckItem[],
  currentSelections: FontSelectionMap,
): FontSelectionMap {
  return items.reduce<FontSelectionMap>((acc, item) => {
    const current = currentSelections[item.from_font];
    const allowed = new Set([
      item.from_font,
      item.to_font,
      ...item.replacement_candidates,
    ]);

    acc[item.from_font] =
      current && allowed.has(current)
        ? current
        : item.to_font || item.from_font;
    return acc;
  }, {});
}

export function buildFontReplacements(
  items: FontCheckItem[],
  fontSelections: FontSelectionMap,
  fontConfigEnabled: boolean,
  fontEnabledMap: FontEnabledMap,
): FontReplacement[] {
  if (!fontConfigEnabled) {
    return [];
  }

  return items
    .map((item) => {
      if (!(fontEnabledMap[item.from_font] ?? true)) {
        return null;
      }

      const selected =
        fontSelections[item.from_font] ?? item.to_font ?? item.from_font;
      const allowed = new Set([
        item.from_font,
        item.to_font,
        ...item.replacement_candidates,
      ]);

      if (!selected || !allowed.has(selected)) {
        return null;
      }

      if (item.supported && selected === item.from_font) {
        return null;
      }

      if (!item.supported || selected !== item.from_font) {
        return {
          from_font: item.from_font,
          to_font: selected,
        };
      }

      return null;
    })
    .filter((item): item is FontReplacement => item !== null);
}
