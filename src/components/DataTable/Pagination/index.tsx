'use client';

import { useEffect, useState } from 'react';

import { Button, Grid, Menu, MenuItem, Pagination, Stack, styled, Typography } from '@mui/material';

import { bindMenu, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';

import { commonStore } from '@/store/slices';
import { stringFormat } from '@/utils/formatString';
import { useTranslation } from 'react-i18next';
import type { NumberFormatValues } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { AppNumberField } from '@/components/NumberField';
const StyledPagination = styled(Pagination)(({ theme }) => ({
   '& .MuiPaginationItem-root': {
      minWidth: '23px !important',
      height: '23px !important',
      padding: 0,
      color: theme.palette.secondary.dark,
   },
   '& .MuiPaginationItem-icon': {
      color: theme.palette.secondary.dark,
   },
   '& .Mui-selected': {
      backgroundColor: `${theme.palette.secondary.dark} !important`,
      color: theme.palette.common.white,
   },
}));

const StyledGoButton = styled(Button)(({ theme }) => ({
   fontSize: theme.typography.body2.fontSize,
   padding: 0,
   width: 30,
   minWidth: 30,
   background: theme.palette.secondary.dark,
   color: theme.palette.common.white,
   height: 24,
   border: 'none',
   '&:hover': {
      opacity: 0.8,
      backgroundColor: theme.palette.secondary.dark,
   },
}));

const StyledAppNumberField = styled(AppNumberField)(() => ({
   '& .MuiInputBase-input': {
      padding: 4,
   },
   '& .MuiOutlinedInput-root': {
      paddingRight: 3,
      borderRadius: 5,
   },
}));

const DataTablePagination = (props) => {
   const { t } = useTranslation();
   const dispatch = useDispatch();

   const {
      page,
      perPage,
      totalItems,
      perPageList,
      onChangePage,
      onChangePerPage,
      lastUpdatedAt,
      lastUpdatedBy,
   } = props;

   const count = Math.ceil(totalItems / perPage);

   const [numberGoToPage, setNumberGoToPage] = useState(0);

   const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

   useEffect(() => {
      setNumberGoToPage(page);
   }, [page]);

   const renderPerPage = () =>
      perPageList.map((item) => (
         <MenuItem onClick={handleChangePerpage(item)} key={`perPage-${item}`}>
            <Typography variant="body2">{item}</Typography>
         </MenuItem>
      ));

   const handleChangePage = (event, nextPage: number) => {
      if (nextPage > 0 && nextPage <= count) {
         onChangePage(nextPage);
      } else {
         dispatch(
            commonStore.actions.setErrorMessage(
               stringFormat(t('commonErrorMessage.invalidPageNo'), 1, count)
            )
         );
      }
   };

   const handleChangePerpage = (perPage: number) => () => {
      popupState.close();
      onChangePerPage(perPage);
   };

   const handleChangeGoToPage = (values: NumberFormatValues) => {
      setNumberGoToPage(values.floatValue);
   };

   const handleGoToPage = () => {
      handleChangePage(null, numberGoToPage);
   };

   return (
      <>
         <Stack
            direction="row"
            alignItems="center"
            sx={{ mx: 1, color: 'secondary.dark', height: 45 }}
         >
            <Stack
               direction="row"
               spacing={0.5}
               alignItems="center"
               sx={{ width: '50%', color: 'black' }}
            >
               {lastUpdatedAt && (
                  <div>
                     {t('Last uploaded by ')} {lastUpdatedBy} {t('table.lastUpdatedAt')}{' '}
                     {lastUpdatedAt}
                  </div>
               )}
            </Stack>

            {/* <Typography component="div" variant="body2" sx={{ fontSize: 10, fontWeight: 'fontWeightBold' }}>
          {countSelectedItems} SELECTED ITEM(S)
        </Typography> */}
            <Stack direction="row" alignItems="center" justifyContent="end" sx={{ width: '50%' }}>
               {/* Rows per page */}
               <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography component="div" variant="body1" sx={{ mr: 0.5 }}>
                     {/* {t('table.rowsPerPage')} */}
                     Số dòng mỗi trang
                  </Typography>
                  <Stack
                     sx={{ cursor: 'pointer' }}
                     spacing={0.5}
                     direction="row"
                     alignItems="center"
                     {...bindTrigger(popupState)}
                  >
                     <Typography component="span" variant="body1">
                        {perPage}
                     </Typography>
                     <ArrowDropDownIcon sx={{ ml: '0 !important' }} />
                  </Stack>
               </Stack>
               {/* Pagination */}
               <StyledPagination count={count} onChange={handleChangePage} page={page} />
               {/* Go to page */}
               <Grid sx={{ width: 70 }}>
                  <StyledAppNumberField
                     onPressEnter={handleGoToPage}
                     debounceDelay={100}
                     onChange={handleChangeGoToPage}
                     decimalScale={0}
                     fixedDecimalScale={false}
                     value={numberGoToPage}
                     InputProps={{
                        endAdornment: (
                           <StyledGoButton
                              type="submit"
                              onClick={handleGoToPage}
                              aria-label="go-to-page"
                           >
                              Đi
                           </StyledGoButton>
                        ),
                     }}
                  />
               </Grid>
            </Stack>
         </Stack>
         <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
         >
            {renderPerPage()}
         </Menu>
      </>
   );
};

DataTablePagination.defaultProps = {
   perPageList: [10, 20, 50, 100, 200, 500],
};

export * from './type';

export { DataTablePagination };
