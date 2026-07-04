// Pure helpers that resolve the correct Home Assistant service for an entity by
// its domain, and read numeric states. No DOM, no card state.

type Hass = any;

/** Extract the domain (the part before the first dot) from an entity id. */
function domainOf(entityId: string): string {
  return entityId.split('.')[0];
}

/** parseFloat that returns null instead of NaN for non-numeric input. */
function parseNumeric(raw: unknown): number | null {
  const n = parseFloat(raw as string);
  return Number.isNaN(n) ? null : n;
}

async function callService(
  hass: Hass,
  domain: string,
  service: string,
  entityId: string,
  data?: Record<string, unknown>
): Promise<void> {
  if (!hass?.callService) return;
  try {
    await hass.callService(domain, service, { entity_id: entityId, ...data });
  } catch (err) {
    console.error(`desk-card: ${domain}.${service} failed for ${entityId}`, err);
  }
}

// Single source of truth for which preset domains are supported and the service
// that fires each. The editor derives its entity-picker allowlist from the keys
// (FIRE_DOMAINS), so the two can't drift. select/input_select are absent by
// design — they have no stored option to activate.
const FIRE_SERVICES: Record<string, string> = {
  button: 'press',
  input_button: 'press',
  // automation.turn_on only enables the automation; .trigger runs its actions.
  automation: 'trigger',
  // There is no script.trigger / scene.trigger — turn_on runs/activates them.
  script: 'turn_on',
  scene: 'turn_on',
  switch: 'turn_on',
  input_boolean: 'turn_on',
};

export const FIRE_DOMAINS = Object.keys(FIRE_SERVICES);

/**
 * Fire a preset entity — call its domain's canonical "run/activate" service.
 * Unsupported domains log a warning and do nothing (never throw); the editor
 * restricts the picker to the supported set, so this is a backstop.
 */
export function fireEntity(hass: Hass, entityId: string): void {
  if (!hass || !entityId) return;
  const domain = domainOf(entityId);
  const service = FIRE_SERVICES[domain];
  if (!service) {
    console.warn(`desk-card: preset entity "${entityId}" domain "${domain}" is not supported.`);
    return;
  }
  callService(hass, domain, service, entityId);
}

/** Drive the cover for manual up/down/stop. */
export function moveCover(hass: Hass, coverEntity: string, dir: 'up' | 'down' | 'stop'): void {
  if (!coverEntity) return;
  const service = dir === 'up' ? 'open_cover' : dir === 'down' ? 'close_cover' : 'stop_cover';
  callService(hass, 'cover', service, coverEntity);
}

/** Toggle a switch/input_boolean entity. */
export function toggleEntity(hass: Hass, entityId: string): void {
  if (!entityId) return;
  callService(hass, domainOf(entityId), 'toggle', entityId);
}

/** Set a `number` entity's value — drives the desk to a target height. */
export function setNumber(hass: Hass, entityId: string, value: number): void {
  if (!entityId) return;
  callService(hass, 'number', 'set_value', entityId, { value });
}

/** Read an entity's numeric state, or null if missing/unavailable/non-numeric. */
export function readNumber(hass: Hass, entityId: string): number | null {
  const state = hass?.states?.[entityId];
  if (!state) return null;
  if (state.state === 'unavailable' || state.state === 'unknown') return null;
  return parseNumeric(state.state);
}
