import * as React from "react";
import {
	Flex,
	// Input,
	// Checkbox,
	FlexProps,
	// Select,
	// IconButton,
	// Tooltip,
} from "@chakra-ui/react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { Option } from '../Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { useState, State } from "@hookstate/core";
import { JSONSchema7, JSONSchema7TypeName } from "../../JsonSchemaEditor.types";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getDefaultSchema, DataType, random, handleTypeChange } from "../utils";
import { SelectChangeEvent } from "@mui/material/Select";
export interface SchemaArrayProps extends FlexProps {
	schemaState: State<JSONSchema7>;
	onSchemaChange: (results: string) => void;
	isReadOnly: State<boolean>;
}
export const SchemaRoot: React.FunctionComponent<SchemaArrayProps> = (
	props: React.PropsWithChildren<SchemaArrayProps>
) => {
	const state = useState(props.schemaState);
	const isReadOnlyState = useState(props.isReadOnly);

	return (
		<>
			{props.onSchemaChange(JSON.stringify(state.value))}
			<Flex
				data-testid="jsonschema-editor"
				direction="row"
				wrap="nowrap"
				size="sm"
				mt={2}
				mr={5}
			>
				<TextField disabled size="small" placeholder="default" sx={{ margin: 2 }} InputProps={{ sx: { borderRadius: "9px" } }} variant="outlined" />
				<Tooltip
					aria-label="All required"
					title="All required"
					placement="top"
				>
					<Checkbox
						disabled={isReadOnlyState.value}
						sx={{ marginY: 2, marginX: 0.25 }}
					/>
				</Tooltip>

				<Select
					variant="outlined"
					disabled={isReadOnlyState.value}
					value={state.type.value ?? ""}
					sx={{ margin: 2 }}
					placeholder="Choose root data type"
					onChange={(evt: SelectChangeEvent<string | JSONSchema7TypeName[]>) => {
						const newSchema = handleTypeChange(
							evt.target.value as JSONSchema7TypeName,
							false
						);
						state.set(newSchema as JSONSchema7);
					}}
				>
					<Option key="object" value="object">object</Option>
					<Option key="array" value="array">array</Option>
				</Select>
				{/* <TextField
					value={state.value?.title ?? ""}
					disabled={isReadOnlyState.value}
					size="small"
					sx={{ margin: 2 }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Title"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						state.title.set(evt.target.value);
					}}
				/> */}
				<TextField
					value={state.value?.description ?? ""}
					disabled={isReadOnlyState.value}
					size="small"
					sx={{ margin: 2, width: "33%" }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Description"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						state.description.set(evt.target.value);
					}}
				/>

				{state.value?.type === "object" && (
					<>
						<Tooltip
							aria-label="Add child node"
							title="Add child node"
							placement="top"
						>
							<IconButton
								disabled={isReadOnlyState.value}
								size="small"
								sx={{ marginX: 0.25, marginY: 2 }}
								color="success"
								aria-label="Add child node"
								onClick={() => {
									const fieldName = `field_${random()}`;
									(state.properties as State<{
										[key: string]: JSONSchema7;
									}>)[fieldName].set(getDefaultSchema(DataType.string));
								}}
							>
								<AddCircleOutlineIcon />
							</IconButton>
						</Tooltip>
					</>
				)}
			</Flex>
		</>
	);
};
