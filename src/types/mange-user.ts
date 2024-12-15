import { ERole } from '@/enums/role.enum';
import { TableState } from './table-state';

export type SelectedFilter = {
   search: string;
};

export type ManageUserState = {
   tableState: TableState;
   selectedFilter: SelectedFilter;
};

export type ManageUserReducer = {
   // data of customer page
   [ERole.USER]: ManageUserState;

   // data of commune page
   [ERole.COMMUNE]: ManageUserState;

   // data of district page
   [ERole.DISTRICT]: ManageUserState;
};

export type EntityType = 'user' | 'commune' | 'district';

/**
 * action props
 */

// Represent the action of setting  a list of users  for a particular entity type
export type SetUserListProps = {
   // The type of entity for which we're setting the user list (e.g: customer, commune, district)
   role: ERole;

   // the data of table: list record, pageNo,pageSize
   tableData: TableState;
};

// Represent of action of setting a loading state for a specified entity type's table
export type SetLoadingTableProps = {
   // the type of entity for which we're setting a loading state for a specified entity type's table
   entityType: EntityType;

   // the loading state
   isLoading: boolean;
};

// Represent the action of adding new user for a specified entity type's table
export type AddUserProps = {
   // the type of entity for which we're inserting for a specified entity type's table
   role: ERole;

   // email of user you want to add into table
   phoneNumber: string;
};

export type SetSelectedFilterProps = {
   role: ERole;
   selectedFilter: SelectedFilter;
};
