import './desk-card';
import './desk-card-editor';

export { DeskCard } from './desk-card';
export { DeskCardEditor } from './desk-card-editor';
export type { DeskCardConfig, Preset } from './desk-card-config';

// Register the card in Home Assistant's "add card" picker.
const cards = ((window as any).customCards = (window as any).customCards || []);
if (!cards.some((c: any) => c.type === 'desk-card')) {
  cards.push({
    type: 'desk-card',
    name: 'Standing Desk Control',
    description: 'Control a motorized sit/stand desk',
  });
}
