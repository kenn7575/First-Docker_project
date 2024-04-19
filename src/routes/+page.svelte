<script lang="ts">
	import type { Receipt } from '$lib/types/types';
	import { Chart, Card, A, Button, Dropdown, DropdownItem, Popover } from 'flowbite-svelte';
	import { InfoIcon, ChevronRightCircle, ChevronDownCircle, File } from 'lucide-svelte';
	type RevenueItem = { date: string; amount: number };
	/** @type {import('./$types').PageData} */
	export let data: any = [];

	let revenueItems = revenuePreprocessor(data.data);

	function revenuePreprocessor(data: Receipt[]) {
		if (!data) return [];
		let revenueItems = data.map((e) => {
			return {
				amount: e.totalPaid,
				date: e.date_purchased.toString()
			};
		});

		// data.forEach((item) => {
		const groupedRevenueItems = groupRevenueByDate(revenueItems);

		return groupedRevenueItems;
	}

	function groupRevenueByDate(data: RevenueItem[]) {
		//group all items from same week
		let weeks: { [key: string]: number } = {};
	}
</script>

<Card>
	<div class="mb-5 flex justify-between">
		<div class="grid grid-cols-2 gap-4">
			<div>
				<h5
					class="mb-2 inline-flex items-center font-normal leading-none text-gray-500 dark:text-gray-400"
				>
					I alt
				</h5>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white">42,3k</p>
			</div>
			<div>
				<h5
					class="mb-2 inline-flex items-center font-normal leading-none text-gray-500 dark:text-gray-400"
				>
					Gennemsnit
				</h5>
				<p class="text-2xl font-bold leading-none text-gray-900 dark:text-white">$5.40</p>
			</div>
		</div>
		<div>
			<Button color="light" class="px-3 py-2"
				>Last week<ChevronDownCircle class="ms-1.5 h-2.5 w-2.5" /></Button
			>
			<Dropdown class="w-40">
				<DropdownItem>Yesterday</DropdownItem>
				<DropdownItem>Today</DropdownItem>
				<DropdownItem>Last 7 days</DropdownItem>
				<DropdownItem>Last 30 days</DropdownItem>
				<DropdownItem>Last 90 days</DropdownItem>
			</Dropdown>
		</div>
	</div>
	{#if data.data.length > 0}
		{#key data.data}
			<Chart
				options={{
					chart: {
						height: '400px',
						type: 'area',
						fontFamily: 'Inter, sans-serif',
						dropShadow: {
							enabled: false
						},
						toolbar: {
							show: false
						}
					},
					tooltip: {
						enabled: true,
						x: {
							show: false
						}
					},
					fill: {
						type: 'gradient',
						gradient: {
							opacityFrom: 0.55,
							opacityTo: 0,
							shade: '#1C64F2',
							gradientToColors: ['#1C64F2']
						}
					},
					dataLabels: {
						enabled: false
					},
					stroke: {
						width: 4
					},
					grid: {
						show: true,
						strokeDashArray: 4,
						padding: {
							left: 2,
							right: 2,
							top: -26
						},
						xaxis: {
							lines: {
								show: true
							}
						},

						yaxis: {
							lines: {
								show: false
							}
						}
					},
					series: [
						{
							name: 'Salg - kr',
							data: revenueItems.map((e) => e.amount),
							color: '#1A56DB'
						}
					],
					xaxis: {
						categories: revenueItems.map((e) => e.date),
						labels: {
							show: false
						},
						axisBorder: {
							show: false
						},
						axisTicks: {
							show: false
						}
					},
					yaxis: {
						show: false
					}
				}}
			/>
		{/key}
	{/if}
	<div
		class="mt-2.5 grid grid-cols-1 items-center justify-between border-t border-gray-200 dark:border-gray-700"
	>
		<div class="pt-5">
			<Button
				href="/"
				class="inline-flex items-center rounded-lg bg-primary-700 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>
				<File class="me-2 h-3.5 w-3.5 text-white" />
				View full report
			</Button>
		</div>
	</div>
</Card>
