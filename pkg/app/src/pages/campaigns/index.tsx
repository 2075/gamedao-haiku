import React, { useEffect, useMemo, useState } from 'react'

import { ArrowDownward } from '@mui/icons-material'
import { Box, Button, Container, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { CampaignFiltersInterface } from 'src/@types/campaign'
import {
	Campaign,
	Campaign_Bool_Exp,
	Campaign_Order_By,
	DisplayValueEntryString,
	useCampaignsPaginationCountSubscription,
	useCampaignsPaginationSubscription,
	useDisplayValuesQuery,
} from 'src/queries'

import { CampaignsList } from 'components/CampaignsList/campaignsList'
import { CampaignFiltersTab } from 'components/CampaignsSection/CampaignFilters/CampaignFiltersTab'
import { FiltersSection } from 'components/FiltersSections/filtersSection'
import { Layout } from 'layouts/default/layout'

export function Campaigns() {
	const { data: displayValuesData } = useDisplayValuesQuery()
	const [limit, setLimit] = useState(15)
	const [filters, setFilters] = useState<CampaignFiltersInterface>({
		query: '',
		sortOption: {},
		filters: [],
	})
	const filtersOptions = useMemo<DisplayValueEntryString[]>(
		() =>
			displayValuesData?.displayValues?.campaignFilters?.map((x) => ({
				...x,
				value: eval(`(${x?.value ?? 'null'})`),
			})),
		[displayValuesData],
	)
	useEffect(() => {
		if (filtersOptions) {
			setFilters((prev) => ({
				...prev,
				filters: filtersOptions
					?.filter((x) => x?.key !== 'state_failed')
					?.map((x) => JSON.parse(JSON.stringify(x?.value))),
			}))
		}
	}, [filtersOptions, setFilters])
	const queryFilters = useMemo<Campaign_Bool_Exp[]>(
		() => [
			{
				_and: [
					filters.filters.length
						? {
								_or: [...filters.filters] as Campaign_Bool_Exp[],
						  }
						: {},
					{
						_or: [
							{
								campaign_metadata: {
									_or: [
										{
											name: {
												_ilike: `%${filters.query ?? ''}%`,
											},
										},
										{
											title: {
												_ilike: `%${filters.query ?? ''}%`,
											},
										},
									],
								},
							},
							{
								organization: {
									organization_metadata: {
										name: {
											_ilike: `%${filters.query ?? ''}%`,
										},
									},
								},
							},
						],
					},
				],
			},
		],
		[filters.filters, filters.query],
	)
	const { data, loading } = useCampaignsPaginationSubscription({
		variables: {
			limit,
			filters: queryFilters,
			order_by: filters.sortOption as Campaign_Order_By,
		},
	})
	const campaignsCount = useCampaignsPaginationCountSubscription({
		variables: { filters: queryFilters },
	})
	const paginatedData = useMemo<Campaign[]>(() => data?.campaign?.slice() as Campaign[], [data])
	const { t } = useTranslation()
	const buttonVisibility = useMemo(
		() => paginatedData?.length < campaignsCount?.data?.campaign_aggregate?.aggregate?.count,
		[paginatedData?.length, campaignsCount?.data],
	)

	return (
		<Layout showHeader showFooter showSidebar title={t('labels:campaigns')}>
			<Box sx={{ mb: 2 }}>
				<Grid container justifyContent="space-between" spacing={3}>
					<Grid item>
						<Typography variant="h3">{t('label:campaigns')}</Typography>
					</Grid>
					<Grid item></Grid>
				</Grid>
			</Box>

			{campaignsCount?.data?.campaign_aggregate?.aggregate.count > 0 ? (
				<>
					<FiltersSection
						setFilters={setFilters}
						filters={filters}
						sortOptions={displayValuesData?.displayValues?.campaignSortOptions?.concat([])}
						searchPlaceHolder={t('label:search_campaigns')}
						ListTab={CampaignFiltersTab}
						filtersOptions={filtersOptions}
						defaultOption={'time_left_desc'}
					/>

					{paginatedData?.length === 0 && !loading && (
						<Box sx={{ mt: 2, mb: 4 }}>
							<Typography fontWeight={700}>{t('page:campaigns:no_campaigns')}</Typography>
							{filters.query && (
								<Typography>{t('page:campaigns:no_result', { query: filters.query })}</Typography>
							)}
						</Box>
					)}

					<Box sx={{ mt: 2, mb: 4 }}>
						<CampaignsList loading={loading} campaigns={paginatedData} />
					</Box>

					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 3 }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 1.5,
								}}
							>
								{buttonVisibility && (
									<Button
										endIcon={<ArrowDownward />}
										onClick={() => setLimit((p) => p + 30)}
										variant="outlined"
									>
										{t('button:ui:load_more')}
									</Button>
								)}
								<Typography>
									{t('page:campaigns:showing_results', {
										count1: paginatedData?.length,
										count2: campaignsCount?.data?.campaign_aggregate?.aggregate.count,
									})}
								</Typography>
							</Box>
						</Box>
					</Box>
				</>
			) : (
				<>No Campaigns yet — why not create one!</>
			)}
		</Layout>
	)
}

export default Campaigns
