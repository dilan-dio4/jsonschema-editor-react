import * as React from "react";
import {
	Flex,
	// Input,
	// Checkbox,
	FlexProps,
	// Select,
	// Tooltip,
	// IconButton,
} from "@chakra-ui/react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { Option } from '../Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
// import { FiSettings } from "react-icons/fi";
import SettingsIcon from '@mui/icons-material/Settings';
// import { IoIosAddCircleOutline } from "react-icons/io";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import { AiOutlineDelete } from "react-icons/ai";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DropPlus } from "../drop-plus";
import { useState, State, none } from "@hookstate/core";
import {
	JSONSchema7,
	JSONSchema7Definition,
	JSONSchema7TypeName,
} from "../../JsonSchemaEditor.types";
import {
	getDefaultSchema,
	DataType,
	SchemaTypes,
	random,
	handleTypeChange,
} from "../utils";
import { renameKeys, deleteKey } from "../utils";
import { useDebouncedCallback } from "use-debounce";
import { SchemaObject } from "../schema-object";
import { SchemaArray } from "../schema-array";
import { SelectChangeEvent } from "@mui/material/Select";

export interface SchemaItemProps extends FlexProps {
	required: string[];
	itemStateProp: State<JSONSchema7>;
	parentStateProp: State<JSONSchema7>;
	name: string;
	isReadOnly: State<boolean>;
	showadvanced: (item: string) => void;
}

export const SchemaItem: React.FunctionComponent<SchemaItemProps> = (
	props: React.PropsWithChildren<SchemaItemProps>
) => {
	const {
		name,
		itemStateProp,
		showadvanced,
		required,
		parentStateProp,
		isReadOnly,
	} = props;

	// const itemState = useState(itemStateProp);
	const parentState = useState(parentStateProp);
	const parentStateOrNull: State<JSONSchema7> | undefined = parentState.ornull;
	const propertiesOrNull:
		| State<{
			[key: string]: JSONSchema7Definition;
		}>
		| undefined = parentStateOrNull.properties.ornull;

	const nameState = useState(name);
	const isReadOnlyState = useState(isReadOnly);

	const itemState = useState(
		(parentStateProp.properties as State<{
			[key: string]: JSONSchema7;
		}>).nested(nameState.value)
	);

	const { length } = parentState.path.filter((name) => name !== "properties");
	const tagPaddingLeftStyle = {
		paddingLeft: `${20 * (length + 1)}px`,
	};

	const isRequired = required
		? required.length > 0 && required.includes(name)
		: false;
	const duplicateErrorState = useState("");

	// Debounce callback
	const debounced = useDebouncedCallback(
		// function
		(newValue: string) => {
			// Todo: make toast for duplicate properties
			if (propertiesOrNull && propertiesOrNull[newValue].value) {
				duplicateErrorState.set("Duplicate property") // We don't have to set back to "" because this already re-renders
			} else {
				const oldName = name;
				const proptoupdate = newValue;

				const newobj = renameKeys(
					{ [oldName]: proptoupdate },
					parentState.properties.value
				);
				parentStateOrNull.properties.set(JSON.parse(JSON.stringify(newobj)));
			}
		},
		// delay in ms, race condition if someone opens advanced settings too fast, but after debounce user is unfocused for some reason
		900
	);

	if (!itemState.value) {
		return <></>;
	}

	return (
		<div>
			<Flex
				alignContent="space-evenly"
				direction="row"
				wrap="nowrap"
				className="schema-item"
				style={tagPaddingLeftStyle}
			>
				<TextField
					disabled={isReadOnlyState.value}
					defaultValue={nameState.value}
					size="small"
					sx={{ margin: 2, "& .MuiFormHelperText-root": { height: 0 } }}
					error={!!duplicateErrorState.value}
					helperText={duplicateErrorState.value || <></>}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Property name"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						debounced(evt.target.value);
					}}
				/>
				<Tooltip
					aria-label="Required"
					title="Required"
					placement="top"
				>
					<Checkbox
						disabled={isReadOnlyState.value}
						checked={isRequired}
						sx={{ marginY: 2, marginX: 0.25 }}
						onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
							if (!evt.target.checked && required.includes(name)) {
								(parentState.required as State<string[]>)[
									required.indexOf(name)
								].set(none);
							} else {
								parentState.required.merge([name]);
							}
						}}
					/>
				</Tooltip>
				<Select
					disabled={false}
					variant="outlined"
					value={itemState.type.value}
					sx={{ margin: 2 }}
					placeholder="Choose data type"
					onChange={(evt: SelectChangeEvent<"string" | "number" | "boolean" | "object" | "integer" | "array" | "null" | JSONSchema7TypeName[]>) => {
						const newSchema = handleTypeChange(
							evt.target.value as JSONSchema7TypeName,
							false
						);
						itemState.set(newSchema as JSONSchema7);
					}}
				>
					{SchemaTypes.map((item, index) => <Option key={String(index)} value={item}>{item}</Option>)}
				</Select>
				{/* <TextField
					disabled={isReadOnlyState.value}
					value={itemState.title.value || ""}
					size="small"
					sx={{ margin: 2 }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Title"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						itemState.title.set(evt.target.value);
					}}
				/> */}
				<TextField
					disabled={isReadOnlyState.value}
					value={itemState.description.value || ""}
					size="small"
					sx={{ margin: 2, width: "33%" }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
					placeholder="Description"
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
						itemState.description.set(evt.target.value);
					}}
				/>

				{itemState.type.value !== "object" && itemState.type.value !== "array" && (
					<Tooltip
						aria-label="Advanced settings"
						title="Advanced settings"
						placement="top"
					>
						<IconButton
							disabled={isReadOnlyState.value}
							size="small"
							sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
							disableRipple
							aria-label="Advanced settings"
							onClick={() => {
								showadvanced(name);
							}}
						>
							<SettingsIcon />
						</IconButton>
					</Tooltip>
				)}

				<Tooltip
					aria-label="Remove node"
					title="Remove node"
					placement="top"
				>
					<IconButton
						disabled={isReadOnlyState.value}
						size="small"
						sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
						disableRipple
						aria-label="Remove node"
						onClick={() => {
							const updatedState = deleteKey(
								nameState.value,
								JSON.parse(JSON.stringify(parentState.properties.value))
							);
							parentState.properties.set(updatedState);
						}}
					>
						<DeleteOutlineIcon />
					</IconButton>
				</Tooltip>

				{itemState.type?.value === "object" ? (
					<DropPlus
						isDisabled={isReadOnlyState.value}
						parentStateProp={parentState}
						itemStateProp={itemStateProp}
					/>
				) : (
					<Tooltip
						aria-label="Add sibling node"
						title="Add sibling node"
						placement="top"
					>
						<IconButton
							disabled={isReadOnlyState.value}
							size="small"
							sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
							disableRipple
							aria-label="Add Sibling Node"
							onClick={() => {
								if (propertiesOrNull) {
									const fieldName = `field_${random()}`;
									propertiesOrNull
										?.nested(fieldName)
										.set(getDefaultSchema(DataType.string) as JSONSchema7);
								}
							}}
						>
							<AddCircleOutlineIcon />
						</IconButton>
					</Tooltip>
				)}
			</Flex>
			{itemState.type?.value === "object" && (
				<SchemaObject isReadOnly={isReadOnlyState} schemaState={itemState} />
			)}
			{itemState.type?.value === "array" && (
				<SchemaArray isReadOnly={isReadOnlyState} schemaState={itemState} />
			)}
		</div>
	);
};
