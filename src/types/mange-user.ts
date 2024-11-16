export interface User {
   id: string;
   name: string;
   phone: string;
   avatar: string;
   address: string;
   role: string;
   email?: string;

   [key: string]: unknown;
}

export type TableState = {
   rows: User[];
   pageSize: number;
   pageNo: number;
   loading: boolean;
};

export type ManageUserState = {
   tableState: TableState;
};

export type ManageUserReducer = {
   // data of customer page
   customer: ManageUserState;

   // data of commune page
   commune: ManageUserState;

   // data of district page
   district: ManageUserState;
};

export type EntityType = 'customer' | 'commune' | 'district';

/**
 * action props
 */

// Represent the action of setting  a list of users  for a particular entity type
export type SetUserListProps = {
   // The type of entity for which we're setting the user list (e.g: customer, commune, district)
   entityType: EntityType;

   // the arrays of user to be associated with the specified entity type
   userRecords: User[];
};

// Represent of action of setting a loading state for a specified entity type's table
export type SetLoadingTableProps = {
   // the type of entity for which we're setting a loading state for a specified entity type's table
   entityType: EntityType;

   // the loading state
   isLoading: boolean;
};
