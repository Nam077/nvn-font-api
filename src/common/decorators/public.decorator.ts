import type { CustomDecorator } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';

import { IS_PUBLIC } from '@shared/constants/app.constant';

/**
 * Public decorator.
 *
 * @returns {CustomDecorator<string>} - SetMetadata.
 */
export const Public = (): CustomDecorator<string> => SetMetadata(IS_PUBLIC, true);
