import * as React from "react";
import {
	Flex,
	// Input,
	// Checkbox,
	FlexProps,
	// Select,
	// IconButton,
	// Tooltip,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	// Button,
} from "@chakra-ui/react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select, { Option } from '../Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, State } from "@hookstate/core";
import { JSONSchema7, JSONSchema7TypeName } from "../../JsonSchemaEditor.types";
// import { FiSettings } from "react-icons/fi";
import SettingsIcon from '@mui/icons-material/Settings';
// import { IoIosAddCircleOutline } from "react-icons/io";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
	SchemaTypes,
	getDefaultSchema,
	DataType,
	handleTypeChange,
	random,
} from "../utils";

import { SchemaObject } from "../schema-object";
import { AdvancedSettings } from "../schema-advanced";
import { SelectChangeEvent } from "@mui/material/Select";
export interface SchemaArrayProps extends FlexProps {
	schemaState: State<JSONSchema7>;
	isReadOnly: State<boolean>;
}
export const SchemaArray: React.FunctionComponent<SchemaArrayProps> = (
	props: React.PropsWithChildren<SchemaArrayProps>
) => {
	const { schemaState, isReadOnly } = props;

	const state = useState(schemaState.items as JSONSchema7);
	const isReadOnlyState = useState(isReadOnly);

	const { length } = state.path.filter((name) => name !== "properties");
	const tagPaddingLeftStyle = {
		paddingLeft: `${20 * (length + 1)}px`,
	};

	const onCloseAdvanced = (): void => {
		localState.isAdvancedOpen.set(false);
	};

	const showadvanced = (): void => {
		localState.isAdvancedOpen.set(true);
	};

	const focusRef = React.createRef<HTMLElement>();

	const localState = useState({
		isAdvancedOpen: false,
	});

	return (
		<>
			<Flex
				direction="row"
				wrap="nowrap"
				className="array-item"
				mt={2}
				mr={5}
				style={tagPaddingLeftStyle}
			>
				<TextField
					key="elements"
					disabled
					value="elements"
					size="small"
					sx={{ margin: 2, flexShrink: 1 }}
					InputProps={{ sx: { borderRadius: "9px" } }}
					variant="outlined"
				/>
				<Checkbox disabled sx={{ marginY: 2, marginX: 0.25 }} />
				<Select
					disabled={isReadOnlyState.value}
					value={state.type.value as JSONSchema7TypeName}
					sx={{ margin: 2 }}
					placeholder="Choose data type"
					onChange={(evt: SelectChangeEvent<"string" | "number" | "boolean" | "object" | "integer" | "array" | "null">) => {
						const newSchema = handleTypeChange(
							evt.target.value as JSONSchema7TypeName,
							false
						);
						state.set(newSchema as JSONSchema7);
					}}
				>
					{SchemaTypes.map((item, index) => <Option key={String(index)} value={item}>{item}</Option>)}
				</Select>
				{/* <TextField
					value={state.title.value}
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
					value={state.description.value}
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
				<Tooltip
					aria-label="Advanced Settings"
					title="Advanced Settings"
					placement="top"
				>
					<IconButton
						disabled={isReadOnlyState.value}
						size="small"
						sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
						disableRipple
						aria-label="Advanced Settings"
						onClick={() => {
							showadvanced();
						}}
					>
						<SettingsIcon />
					</IconButton>
				</Tooltip>

				{state.type.value === "object" && (
					<Tooltip
						aria-label="Add Child Node"
						title="Add Child Node"
						placement="top"
					>
						<IconButton
							disabled={isReadOnlyState.value}
							size="small"
							sx={{ marginX: 0.25, marginY: 2, "&:hover": { backgroundColor: "transparent" } }}
							disableRipple
							aria-label="Add Child Node"
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
				)}
			</Flex>
			{state.type?.value === "object" && (
				<SchemaObject isReadOnly={isReadOnlyState} schemaState={state} />
			)}
			{state.type?.value === "array" && (
				<SchemaArray isReadOnly={isReadOnlyState} schemaState={state} />
			)}
			<Modal
				isOpen={localState.isAdvancedOpen.get()}
				finalFocusRef={focusRef}
				size="lg"
				onClose={onCloseAdvanced}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center">Advanced Schema Settings</ModalHeader>

					<ModalBody>
						<AdvancedSettings itemStateProp={state} />
					</ModalBody>

					<ModalFooter>
						<Button
							color="primary"
							sx={{ marginRight: 3 }}
							onClick={onCloseAdvanced}
						>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
