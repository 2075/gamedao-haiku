import {
	PanoramaFishEyeOutlined as Dashboard, // or DashboardOutlined
	CastleOutlined as Folder, // or AccountBalanceOutlined
	Logout,
	MoreVert,
	ExtensionOutlined as NotificationsNone, //or CategoryOultined
	Fingerprint as Settings,
	SportsEsportsOutlined as Topic,
} from '@mui/icons-material'
import { Box, Button, Divider, ListItemIcon, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { useExtensionContext } from 'providers/extension/modules/context'
import { useGraphQlContext } from 'providers/graphQl/modules/context'

import { AccountCard } from 'components/AccountCard/accountCard'
import { BalanceCard } from 'components/BalanceCard/balanceCard'
import Link from 'components/Link'

interface ComponentProps {
	anchorEl: Element
	open: boolean
	handleClose: () => void
	openAccountSelect: () => void
	openNetworkSelect: (event) => void
}

export function Flyout({ anchorEl, open, handleClose, openAccountSelect, openNetworkSelect }: ComponentProps) {
	const { disconnectWallet, selectedAccount } = useExtensionContext()
	const { endpoints, selectedEndpoint } = useGraphQlContext()

	return (
		<Menu
			anchorEl={anchorEl}
			id="account-menu"
			open={open}
			onClose={handleClose}
			onClick={handleClose}
			PaperProps={{
				elevation: 0,
				sx: {
					overflow: 'visible',
					filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
					mt: { xs: '1.25rem', sm: '1rem' },
					borderRadius: '1rem',
					'& .MuiAvatar-root': {
						width: 32,
						height: 32,
						ml: -0.5,
						mr: 1,
					},

					'&:before': {
						content: '""',
						display: 'block',
						position: 'absolute',
						top: 0,
						right: 60,
						width: 10,
						height: 10,
						bgcolor: 'background.paper',
						transform: 'translateY(-50%) rotate(45deg)',
						zIndex: 0,
					},
				},
			}}
			transformOrigin={{ horizontal: 'center', vertical: 'top' }}
			anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
		>
			<Stack p={{ xs: 1, sm: 3 }} spacing={{ xs: 1, sm: 3 }}>
				{/*
				<AccountCard accountState={selectedAccount} callback={openAccountSelect} />
*/}
				<BalanceCard />

				<Divider />

				<Stack width={240} sx={{ '&': { p: 0, m: 0 } }} spacing={2}>
					<Link href={'/account'}>
						<MenuItem sx={{ p: 0 }}>
							<ListItemIcon>
								<Dashboard fontSize="small" />
							</ListItemIcon>
							<Typography variant="body2">Dashboard</Typography>
						</MenuItem>
					</Link>
					<Link href={'/organisations'}>
						<MenuItem sx={{ p: 0 }}>
							<ListItemIcon>
								<Folder fontSize="small" />
							</ListItemIcon>
							<Typography variant="body2">Organizations</Typography>
						</MenuItem>
					</Link>
					<Link href={'/account/campaigns'}>
						<MenuItem sx={{ p: 0 }}>
							<ListItemIcon>
								<Topic fontSize="small" />
							</ListItemIcon>
							<Typography variant="body2">Campaigns</Typography>
						</MenuItem>
					</Link>
					<Link href={'/account/collectables'}>
						<MenuItem sx={{ p: 0 }}>
							<ListItemIcon>
								<NotificationsNone fontSize="small" />
							</ListItemIcon>
							<Typography variant="body2">Collectables</Typography>
						</MenuItem>
					</Link>
					<Link href={'/account/identity'}>
						<MenuItem sx={{ p: 0 }}>
							<ListItemIcon>
								<Settings fontSize="small" />
							</ListItemIcon>
							<Typography variant="body2">Identity</Typography>
						</MenuItem>
					</Link>
					<MenuItem onClick={disconnectWallet as any} sx={{ p: 0 }}>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						<Typography variant="body2">Disconnect</Typography>
					</MenuItem>
				</Stack>

				{/*
				<Divider />
				<Box display="flex" justifyContent="center" alignItems="center" gap={1}>
					<Typography variant="body2" fontWeight="bold">
						{selectedEndpoint?.name ?? ''}
						{endpoints?.length > 1 && (
							<Button onClick={openNetworkSelect}>
								<MoreVert fontSize="small" />
							</Button>
						)}
					</Typography>
				</Box>
*/}
			</Stack>
		</Menu>
	)
}
