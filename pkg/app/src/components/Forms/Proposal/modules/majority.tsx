import { useCallback } from 'react'

import { Person } from '@mui/icons-material'
import { InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { useProposalFeatures } from 'hooks/featureToggle/useProposalFeatures'
import { PROPOSAL_CREATE_DEPOSIT } from 'src/constants/proposal'

import { BaseForm } from 'components/Forms/baseForm'
import { RadioItem } from 'components/Forms/modules/radioItem'

interface ComponentProps {
	selected: number
	setSelected: (number) => void
	deposit: number
	setDeposit: (number) => void
	type: number
}

export function Majority({ selected, setSelected, deposit, setDeposit, type }: ComponentProps) {
	const enabledFeature = useProposalFeatures()

	const handleDepositChange = useCallback(
		(event) => {
			const value = event.target.value
			setDeposit(value < 1 ? 1 : value)
		},
		[setDeposit],
	)

	return (
		<BaseForm title={'What type of voting do you need?'}>
			<RadioItem
				icon={<Person sx={{ width: '40px', height: '40px' }} />}
				title={'Simple majority'}
				description={'The option with the most single votes wins'}
				value={0}
				selectedValue={selected}
				onChange={setSelected}
				disabled={!enabledFeature.CREATE_PROPOSAL_SIMPLE_MAJORITY}
			/>
			<RadioItem
				icon={<Person sx={{ width: '40px', height: '40px' }} />}
				title={'Relative majority'}
				description={'The option with the most single votes wins'}
				value={1}
				selectedValue={selected}
				onChange={setSelected}
				disabled={!enabledFeature.CREATE_PROPOSAL_RELATIVE_MAJORITY}
			/>
			<RadioItem
				icon={<Person sx={{ width: '40px', height: '40px' }} />}
				title={'Absolute majority'}
				description={'The option with the most single votes wins'}
				value={2}
				selectedValue={selected}
				onChange={setSelected}
				disabled={!(enabledFeature as any).CREATE_PROPOSAL_ABSOLUTE_MAJORITY}
			/>
			<Stack alignItems="center" justifyContent="space-between" spacing={1} direction="row" width="100%">
				<Typography>A min deposit of {PROPOSAL_CREATE_DEPOSIT[type]} GAME is needed.</Typography>
				<TextField
					variant="outlined"
					label="Deposit"
					type="number"
					InputProps={{
						endAdornment: <InputAdornment position="start">GAME</InputAdornment>,
					}}
					value={deposit}
					onChange={handleDepositChange}
				/>
			</Stack>
		</BaseForm>
	)
}
