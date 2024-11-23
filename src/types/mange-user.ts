import { UserAuth } from './auth';

/**
 * table state
 */
export type TableState = {
   rows: UserAuth[];
   pageSize: number;
   pageNo: number;
   loading: boolean;
   totalItems: number;
};

export type SelectedFilter = {
   search: string;
};

export type ManageUserState = {
   tableState: TableState;
   selectedFilter: SelectedFilter;
};

export type ManageUserReducer = {
   // data of customer page
   user: ManageUserState;

   // data of commune page
   commune: ManageUserState;

   // data of district page
   district: ManageUserState;
};

export type EntityType = 'user' | 'commune' | 'district';

/**
 * action props
 */

// Represent the action of setting  a list of users  for a particular entity type
export type SetUserListProps = {
   // The type of entity for which we're setting the user list (e.g: customer, commune, district)
   entityType: EntityType;

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
   entityType: EntityType;

   // email of user you want to add into table
   email: string;
};
