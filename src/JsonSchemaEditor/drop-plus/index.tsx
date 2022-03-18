import * as React from "react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Stack,
	FlexProps,
	// IconButton,
	// Button,
} from "@chakra-ui/react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
// import { IoIosAddCircleOutline } from "react-icons/io";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { DataType, getDefaultSchema } from "../utils";
import { State, useState } from "@hookstate/core";
import {
	JSONSchema7,
	JSONSchema7Definition,
} from "../../JsonSchemaEditor.types";
import { random } from "../utils";
export interface DropPlusProps extends FlexProps {
	itemStateProp: State<JSONSchema7>;
	parentStateProp: State<JSONSchema7>;
	isDisabled: boolean;
}
export const DropPlus: React.FunctionComponent<DropPlusProps> = (
	props: React.PropsWithChildren<DropPlusProps>
) => {
	const itemState = useState(props.itemStateProp);
	const parentState = useState(props.parentStateProp);
	const parentStateOrNull: State<JSONSchema7> | undefined = parentState.ornull;
	const propertiesOrNull:
		| State<{
			[key: string]: JSONSchema7Definition;
		}>
		| undefined = parentStateOrNull.properties.ornull;

	const itemPropertiesOrNull:
		| State<{
			[key: string]: JSONSchema7Definition;
		}>
		| undefined = itemState.properties.ornull;

	if (props.isDisabled) {
		return <div />;
	}

	if (!parentStateOrNull) {
		return <></>;
	}

	return (
		<Popover trigger="hover">
			<PopoverTrigger>
				<IconButton
					size="small"
					sx={{ marginX: 0.25, marginY: 2 }}
					aria-label="Add child node"
				>
					<AddCircleOutlineIcon />
				</IconButton>
			</PopoverTrigger>

			<PopoverContent border="0" zIndex={4} width="100px" color="white">
				<Stack>
					<Button
						color="primary"
						variant="contained"
						sx={{ borderRadius: "9px" }}
						disableElevation
						size="small"
						onClick={() => {
							const fieldName = `field_${random()}`;
							propertiesOrNull
								?.nested(fieldName)
								.set(getDefaultSchema(DataType.string) as JSONSchema7);
						}}
					>
						Sibling node
					</Button>
					<Button
						size="small"
						color="secondary"
						variant="contained"
						sx={{ borderRadius: "9px" }}
						disableElevation
						onClick={() => {
							if (itemState.properties) {
								const fieldName = `field_${random()}`;
								itemPropertiesOrNull
									?.nested(fieldName)
									.set(getDefaultSchema(DataType.string) as JSONSchema7);
							}
						}}
					>
						Child node
					</Button>
				</Stack>
			</PopoverContent>
		</Popover>
	);
};
