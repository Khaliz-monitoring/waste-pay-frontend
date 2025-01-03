'use client';

import { useState, useMemo, isValidElement, useRef, useEffect } from 'react';

import {
   TextField,
   Checkbox,
   Autocomplete,
   AutocompleteRenderInputParams,
   Typography,
   Box,
   createFilterOptions,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FormControllerErrorMessage } from '@/components';
import _ from 'lodash';

import type { AppAutocompleteProps } from './type';
const filter = createFilterOptions<FilmOptionType>();
interface FilmOptionType {
   value?: string;
   title: string;
   year?: number;
}

const useStyles = makeStyles((theme) => ({
   buttonGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 !important',
   },
   appAutocomplete__chip__container: {
      height: '19px !important',
      // fontSize: theme.typography.body2.fontSize,
      // backgroundColor: `${theme.palette.grey[200]} !important`,
      borderRadius: '8px !important',
      maxWidth: 'calc(100% - 30px)!important',
   },
   appAutocomplete__chip__icon: {
      fontSize: '14px !important',
   },
}));

const AppAutocomplete: React.FC<AppAutocompleteProps<any>> = (props) => {
   const {
      error,
      helperText,
      label,
      required,
      textFieldProps,
      primaryKeyOption,
      options,
      value,
      renderOption,
      multiple,
      isFocus,
      freeSolo,
      updateOptions,
      onChange,
      ...autocompleteProps
   } = props;
   const classes = useStyles();
   const focusRef = useRef(null);

   const [isFocusing, setIsFocusing] = useState(false);
   const openTooltip = useMemo(() => isFocusing && error, [error, isFocusing]);

   const formatValue = useMemo(() => {
      try {
         if (_.isInteger(value) || _.isString(value)) {
            return _.find(options, (item) => item[primaryKeyOption] === value);
         }
         return value;
      } catch (error) {
         return _.toString(value);
      }
   }, [options, value]);

   const filteredOptions = useMemo(() => {
      if (_.every(options, (op) => _.has(op, 'status'))) {
         return _.filter(options, { status: true });
      }
      return options;
   }, [options]);

   useEffect(() => {
      if (focusRef.current) {
         focusRef.current.focus();
      }
   }, []);

   const isOptionEqualToValue = (option, value) => {
      try {
         if (_.isInteger(option) || _.isString(option)) {
            return option[primaryKeyOption] === value;
         }

         return option[primaryKeyOption] === value[primaryKeyOption];
      } catch {
         return false;
      }
   };

   const renderOptionMultiple = (prop, option, state) => {
      const { selected } = state;

      const desc = renderOption(prop, option, state, null);
      if (isValidElement(desc)) {
         return (
            <Box display="flex" alignItems="center" {...prop}>
               <Checkbox
                  checked={selected}
                  style={{ padding: 0, paddingRight: 8 }}
                  color="primary"
               />
               <span>{desc}</span>
            </Box>
         );
      }
      return (
         <Typography {...prop}>
            <Checkbox checked={selected} style={{ padding: 0, paddingRight: 8 }} color="primary" />
            <span>{desc}</span>
         </Typography>
      );
   };

   const tranformRenderOption = (prop, option, state) => {
      const desc = renderOption(prop, option, state, null);
      if (isValidElement(desc)) {
         return desc;
      }
      return <Typography {...prop}>{desc}</Typography>;
   };

   const getRenderOption = () => {
      if (multiple) {
         return renderOptionMultiple;
      }

      return tranformRenderOption;
   };

   const onHoverField = () => {
      setIsFocusing(true);
   };

   const onLeavingField = () => {
      setIsFocusing(false);
   };

   let newOption = null;

   const renderInput = (params: AutocompleteRenderInputParams) => {
      return (
         <TextField
            {...params}
            error={error}
            label={label}
            required={required}
            inputRef={isFocus && focusRef}
            {...textFieldProps}
            sx={{
               maxHeight: 25,
               '& .MuiInputBase-root': {
                  backgroundColor: '#fff',
               },
            }}
            InputProps={{
               ...params.InputProps,
               ...textFieldProps.InputProps,
               onKeyDown: (e) => {
                  if (e.key === 'Enter' && freeSolo) {
                     e.preventDefault();
                  }
               },
            }}
         />
      );
   };

   return (
      <FormControllerErrorMessage title={helperText} open={openTooltip}>
         <Autocomplete
            value={formatValue}
            onMouseOver={onHoverField}
            onMouseLeave={onLeavingField}
            noOptionsText="No result found"
            ChipProps={{
               classes: {
                  root: classes.appAutocomplete__chip__container,
                  deleteIcon: classes.appAutocomplete__chip__icon,
               },
            }}
            isOptionEqualToValue={isOptionEqualToValue}
            multiple={multiple}
            renderInput={renderInput}
            renderOption={getRenderOption()}
            options={filteredOptions}
            freeSolo={freeSolo}
            onChange={(e, option) => {
               onChange(e, option, newOption);
            }}
            {...autocompleteProps}
            filterOptions={(options, params) => {
               const filtered = filter(options, params);

               const { inputValue } = params;
               // Suggest the creation of a new value
               const isExisting = options.some((option) => inputValue === option.value);
               if (inputValue !== '' && !isExisting && freeSolo) {
                  const optionNew = {
                     value: inputValue,
                     title: `Create new '${inputValue}'`,
                  };
                  filtered.unshift(optionNew);

                  newOption = optionNew;
               }

               return filtered;
            }}
         />
      </FormControllerErrorMessage>
   );
};

AppAutocomplete.defaultProps = {
   primaryKeyOption: 'id',
   textFieldProps: {},
   disableClearable: true,
   renderOption(prop, option) {
      return option?.description;
      AppAutocomplete;
      return option.description;
   },
};

export * from './type';
export default AppAutocomplete;
