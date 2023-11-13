// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/constants';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
