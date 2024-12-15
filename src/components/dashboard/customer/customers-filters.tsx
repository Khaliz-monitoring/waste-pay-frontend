'use client';

import { ERole } from '@/enums/role.enum';
import { useAppDispatch } from '@/store/hooks';
import { manageUserStore } from '@/store/slices';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import * as React from 'react';

interface CustomersFilterProps {
   role: ERole;
}

const CustomersFilters: React.FC<CustomersFilterProps> = ({ role }) => {
   const dispatch = useAppDispatch();

   const handleOnChange = (value: string) => {
      dispatch(manageUserStore.actions.setDataFilter({ role, selectedFilter: { search: value } }));
      dispatch(manageUserStore.firstFetchAction(role));
   };

   return (
      <OutlinedInput
         onChange={(e) => handleOnChange(e.target.value)}
         fullWidth
         placeholder="Search customer"
         startAdornment={
            <InputAdornment position="start">
               <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
         }
         sx={{ maxWidth: '500px' }}
      />
   );
};

export default React.memo(CustomersFilters);
