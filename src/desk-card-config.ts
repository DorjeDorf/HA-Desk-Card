export interface Preset {
  entity: string;         // required — fired on tap; also source of name and icon
  height?: number;        // optional target height in the sensor's unit; drives the active highlight and target label
}

export interface DeskCardConfig {
  type: string;
  title?: string;
  height_sensor: string;
  cover_entity: string;
  child_lock_entity?: string;
  alarm_entity?: string;
  set_height_entity?: string;   // optional `number` entity; makes the position bar draggable to set height
  min_height: number;
  max_height: number;
  hold_to_move?: boolean;   // true = press-and-hold up/down (release stops); false/omitted = tap to move, tap stop to halt
  presets: Preset[];
}

export const DEFAULTS = {
  title: 'Standing Desk',
  min_height: 60,
  max_height: 125,
};

/** Fill in title/min/max defaults. Presets are required, so none is injected. */
export function applyDefaults(config: DeskCardConfig): DeskCardConfig {
  return { ...DEFAULTS, ...config };
}

/**
 * Config for the "add card" stub. No `type` key — Home Assistant prefixes
 * `custom:` itself. Presets start empty; the editor prompts the user to fill
 * them before the card renders.
 */
export function createStubConfig(): Partial<DeskCardConfig> {
  return {
    height_sensor: 'sensor.desk_height',
    cover_entity: 'cover.desk',
    min_height: DEFAULTS.min_height,
    max_height: DEFAULTS.max_height,
    presets: [{ entity: '' }, { entity: '' }],
  };
}

/**
 * Validate a (defaults-applied) config. Returns an error message, or null when
 * valid. setConfig turns a non-null result into a thrown Error.
 */
export function validateConfig(config: unknown): string | null {
  if (!config || typeof config !== 'object') return 'Configuration is missing';
  const c = config as Record<string, unknown>;

  if (typeof c.type !== 'string' || !c.type.endsWith('desk-card')) {
    return 'Invalid card type';
  }
  if (typeof c.height_sensor !== 'string' || !c.height_sensor) {
    return 'height_sensor is required';
  }
  if (typeof c.cover_entity !== 'string' || !c.cover_entity) {
    return 'cover_entity is required';
  }
  if (typeof c.min_height !== 'number' || typeof c.max_height !== 'number') {
    return 'min_height and max_height must be numbers';
  }
  if (c.min_height >= c.max_height) {
    return 'min_height must be less than max_height';
  }
  if (c.hold_to_move !== undefined && typeof c.hold_to_move !== 'boolean') {
    return 'hold_to_move must be true or false';
  }

  if (!Array.isArray(c.presets) || c.presets.length < 1 || c.presets.length > 4) {
    return 'presets must be a list of 1 to 4 items';
  }
  for (const p of c.presets as Preset[]) {
    if (!p || typeof p.entity !== 'string' || !p.entity) return 'Each preset needs an entity';
    if (p.height !== undefined && !Number.isFinite(p.height)) {
      return 'Preset height must be a number';
    }
  }

  return null;
}
