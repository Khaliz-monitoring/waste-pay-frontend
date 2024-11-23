'use client';

import { EWorkspace, extrackWorkspace } from '@/enums/workspace.enum';
import { useUser } from '@/hooks/use-user';
import { paths } from '@/paths';
import { useAppDispatch } from '@/store/hooks';
import { navbarStore } from '@/store/slices';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';

const WorkspaceOption = () => {
   const dispatch = useAppDispatch();
   const router = useRouter();
   const workspaceOptions = useSelector(navbarStore.selectWorkspaceOptions);
   const currentWorkspace = useSelector(navbarStore.selectCurrentWorkspace);

   const handleChangeWorkspace = (event: SelectChangeEvent) => {
      const chooseWorkspace = extrackWorkspace(event.target.value);
      dispatch(navbarStore.actions.setWorkspace(chooseWorkspace));
      router.push(
         chooseWorkspace === EWorkspace.Manager ? paths.dashboard.overview : paths.dashboard.account
      );
   };

   return (
      <FormControl
         sx={{
            m: 1,
            minWidth: 120,
            '& fieldset': {
               borderColor: 'white',
            },
         }}
      >
         <InputLabel sx={{ color: 'white' }}>Workspace</InputLabel>

         <Select
            value={currentWorkspace.toString()}
            label="Workspace"
            onChange={handleChangeWorkspace}
            sx={{
               color: 'white',
               '& .MuiSelect-icon': {
                  color: 'white',
               },
            }}
         >
            {workspaceOptions.map((element) => (
               <MenuItem value={element.toString()}>{element.toString()}</MenuItem>
            ))}
         </Select>
      </FormControl>
   );
};

export default React.memo(WorkspaceOption);
