import { clamp, finite } from "./math";
import type { GlassMaterial, MaterialPresetName } from "./types";

/* Experiment (2026-10-23, FamilyOS): frost retuned toward Apple's measured
   Liquid Glass values from the official iOS 27 Figma UI Kit —
   Regular-Small (tab bar / buttons) Frost 6, Regular-Medium/Large Frost 16 —
   mapped as Figma value / 100. `clear` keeps 0.04: Apple's Clear shares
   Frost 6 with Regular-Small and differs by intensity instead, and the
   renderer needs three distinct frost anchors. Other parameters keep the
   original optics (different engine semantics, no 1:1 counterpart). */
const MATERIAL_PRESETS: Record<MaterialPresetName, GlassMaterial> = {
  regular: {
    thickness: 0.62,
    ior: 1.46,
    dispersion: 0.012,
    edgeStrength: 0.46,
    bevel: 0.68,
    frost: 0.06,
  },
  clear: {
    thickness: 0.78,
    ior: 1.5,
    dispersion: 0.018,
    edgeStrength: 0.54,
    bevel: 0.76,
    frost: 0.04,
  },
  frosted: {
    thickness: 0.44,
    ior: 1.4,
    dispersion: 0.006,
    edgeStrength: 0.36,
    bevel: 0.58,
    frost: 0.16,
  },
};

export function sanitizeMaterial(material: GlassMaterial): GlassMaterial {
  return {
    thickness: clamp(finite(material.thickness, 0.62), 0, 1.5),
    ior: clamp(finite(material.ior, 1.46), 1, 2.5),
    dispersion: clamp(finite(material.dispersion, 0.012), 0, 0.08),
    edgeStrength: clamp(finite(material.edgeStrength, 0.46), 0, 1),
    bevel: clamp(finite(material.bevel, 0.68), 0.05, 1),
    frost: clamp(finite(material.frost, 0.06), 0, 1),
  };
}

export function getMaterialPreset(name: MaterialPresetName): GlassMaterial {
  return { ...MATERIAL_PRESETS[name] };
}
