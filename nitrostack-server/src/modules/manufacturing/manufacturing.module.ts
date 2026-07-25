import { Module } from '@nitrostack/core';
import { ManufacturingTools } from './manufacturing.tools.js';
import { ManufacturingResources } from './manufacturing.resources.js';
import { ManufacturingPrompts } from './manufacturing.prompts.js';

@Module({
  name: 'manufacturing',
  description: 'Manufacturing lifecycle assessment and decision tools',
  controllers: [
    ManufacturingTools,
    ManufacturingResources,
    ManufacturingPrompts
  ]
})
export class ManufacturingModule {}