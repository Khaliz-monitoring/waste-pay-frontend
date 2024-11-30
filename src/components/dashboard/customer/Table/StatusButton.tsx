import { getColorByUserState } from '@/constants/color';
import { EUserState } from '@/enums/user-state.enum';
import { Button } from '@mui/material';
import { memo } from 'react';

interface StatusButtonProps {
   state: EUserState;
}

const StatusButton: React.FC<StatusButtonProps> = ({ state }) => {
   return (
      <Button
         variant="outlined"
         sx={{
            width: 140,
            color: getColorByUserState(state),
            borderColor: getColorByUserState(state),
         }}
      >
         {state?.toString()}
      </Button>
   );
};

export default memo(StatusButton);
