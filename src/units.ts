// Height units follow the configured height sensor: the card displays whatever
// unit HA presents for that sensor (cm, in, mm, …) and treats min/max and preset
// heights as being in that same unit. No assumptions, no conversion — so the card
// always agrees with what HA shows for the desk, whatever the user's unit system.

type Hass = any;

/**
 * The unit the height sensor reports (its `unit_of_measurement`), e.g. 'cm' or
 * 'in'. Empty string when the sensor is unset, unavailable, or unit-less — the
 * card then shows the bare number.
 */
export function heightUnit(hass: Hass, sensorId?: string): string {
  const u = sensorId ? hass?.states?.[sensorId]?.attributes?.unit_of_measurement : undefined;
  return typeof u === 'string' ? u : '';
}

/** Format a height for display: up to 1 decimal, trailing `.0` dropped. */
export function formatHeight(value: number): string {
  return String(Math.round(value * 10) / 10);
}
