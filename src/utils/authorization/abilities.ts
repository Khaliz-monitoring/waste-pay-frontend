import { ERole } from '@/enums/role.enum';
import { paths } from '@/paths';
import { UserAuth } from '@/types/auth';
import { AbilityBuilder, PureAbility, AbilityClass } from '@casl/ability';
import _ from 'lodash';
type Actions = string;
type Subjects = string;

export type AppAbility = PureAbility<[Actions, Subjects]>;

export function defineAbilitiesFor(user: UserAuth) {
   const { can, cannot, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
      PureAbility as AbilityClass<AppAbility>
   );

   if (_.includes([ERole.ADMIN], user?.role)) {
      can('manage', 'all');
   } else if (user?.role == ERole.DISTRICT) {
      can('view', 'all');
      cannot('view', [paths.dashboard.districtManagers]);
   } else if (user?.role == ERole.COMMUNE) {
      can('view', 'all');
      cannot('view', [paths.dashboard.districtManagers, paths.dashboard.communeManagers]);
   } else {
      cannot('view', [
         paths.dashboard.districtManagers,
         paths.dashboard.communeManagers,
         paths.dashboard.customers,
         paths.dashboard.overview,
      ]);
   }

   return build();
}
