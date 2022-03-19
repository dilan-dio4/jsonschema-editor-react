import * as React from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default React.forwardRef(function CustomSelect<TValue>(props: SelectProps<TValue>, ref: React.ForwardedRef<HTMLUListElement>) {
    return <Select
        {...props}
        ref={ref as any}
        autoWidth
        size="small"
        variant="outlined"
        sx={[
            theme => ({
                "& .MuiSelect-outlined:hover, & .MuiSelect-outlined:active": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)"
                },
                "& .MuiSelect-icon": {
                    fontSize: "1.3rem",
                    marginRight: "3px"
                },
                "& .MuiSelect-select": {
                    paddingRight: "45px !important",
                    paddingTop: props.size === "small" ? "6.5px" : "8.5px",
                    paddingBottom: props.size === "small" ? "6.5px" : "8.5px",
                },
                borderRadius: "9px",
                borderStyle: 'none',
                borderWidth: "2px",
                width: "117px"
            }),
            ...(Array.isArray(props.sx) ? props.sx : [props.sx!])
        ]}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
            sx: theme => ({
                "& .MuiMenu-paper": {
                    borderRadius: "9px",
                    marginTop: "4px",
                    boxShadow: theme.shadows[2],
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                },
                "& .MuiMenu-list": {
                    paddingTop: 0,
                    paddingBottom: 0,
                    background: 'white',
                    color: theme.palette.grey[900],
                    "& li": {
                        fontWeight: 300,
                        paddingTop: "6px",
                        paddingBottom: "6px",
                        fontSize: 14,
                        paddingRight: "60px",
                        position: "relative"
                    },
                    "& li:hover": {
                        background: "rgba(0, 0, 0, 0.04)"
                    },
                    "& li.Mui-selected": {
                        background: "rgba(0, 0, 0, 0.04)",
                        fontWeight: 500,
                    },
                    "& li.Mui-selected:hover": {
                        background: "rgba(0, 0, 0, 0.04)"
                    },
                    "& li.Mui-selected::after": {
                        content: "'•'",
                        position: "absolute",
                        right: 16,
                        color: "rgba(0, 0, 0, 0.4)",
                        fontSize: 17
                    },
                }
            }),
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            },
            transformOrigin: {
                vertical: "top",
                horizontal: "left"
            },
            ...props.MenuProps
        }}
    />;
}) as <TValue>(props: SelectProps<TValue> & React.RefAttributes<HTMLUListElement>) => JSX.Element;

export const Option = (props: MenuItemProps) => <MenuItem dense {...props} />