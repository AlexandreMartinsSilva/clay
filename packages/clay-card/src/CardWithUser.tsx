/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ClayButtonWithIcon} from '@clayui/button';
import {ClayDropDownWithItems} from '@clayui/drop-down';
import {ClayCheckbox} from '@clayui/form';
import ClayIcon from '@clayui/icon';
import ClayLayout from '@clayui/layout';
import ClaySticker, {DisplayType as StickerDisplayType} from '@clayui/sticker';
import React from 'react';

import ClayCard from './Card';

export interface IProps extends React.BaseHTMLAttributes<HTMLDivElement> {
	/**
	 * List of actions in the dropdown menu
	 */
	actions?: React.ComponentProps<typeof ClayDropDownWithItems>['items'];

	/**
	 * Props to add to the dropdown trigger element
	 */
	checkboxProps?: React.HTMLAttributes<HTMLInputElement>;

	/**
	 * Value of the description of the user
	 */
	description?: string;

	/**
	 * Flag to indicate that all interactions on the card will be disabled.
	 */
	disabled?: boolean;

	/**
	 * Props to add to the dropdown trigger element
	 */
	dropDownTriggerProps?: React.HTMLAttributes<HTMLButtonElement>;

	/**
	 * Path or URL to user
	 */
	href?: string;

	/**
	 * Name of the user
	 */
	name: string;

	/**
	 * Callback for when item is selected
	 */
	onSelectChange?: (val: boolean) => void;

	/**
	 * Flag to indicate if card is selected
	 */
	selected?: boolean;

	/**
	 * Path to clay icon spritemap
	 */
	spritemap?: string;

	/**
	 * Displays the color of the user icon
	 */
	userDisplayType?: StickerDisplayType;

	/**
	 * Value for alt attribute for user image
	 */
	userImageAlt?: string;

	/**
	 * Path to the user's image
	 */
	userImageSrc?: string;

	/**
	 * Icon name to use for user avatar
	 */
	userSymbol?: string;
}

export const ClayCardWithUser = ({
	actions,
	checkboxProps = {},
	description,
	disabled,
	dropDownTriggerProps = {},
	href,
	name,
	onSelectChange,
	selected = false,
	spritemap,
	userImageAlt = 'thumbnail',
	userDisplayType,
	userImageSrc,
	userSymbol = 'user',
	...otherProps
}: IProps) => {
	const content = (
		<div className="aspect-ratio-item-center-middle card-type-asset-icon">
			<ClaySticker
				className="sticker-user-icon"
				displayType={userDisplayType}
				shape="circle"
			>
				{userImageSrc && (
					<ClaySticker.Image alt={userImageAlt} src={userImageSrc} />
				)}
				{!userImageSrc && (
					<ClayIcon spritemap={spritemap} symbol={userSymbol} />
				)}
			</ClaySticker>
		</div>
	);

	return (
		<ClayCard
			{...otherProps}
			active={selected}
			displayType="user"
			selectable={!!onSelectChange}
		>
			<ClayCard.AspectRatio className="card-item-first">
				{onSelectChange && (
					<ClayCheckbox
						{...checkboxProps}
						checked={selected}
						disabled={disabled}
						onChange={() => onSelectChange(!selected)}
					>
						{content}
					</ClayCheckbox>
				)}

				{!onSelectChange && content}
			</ClayCard.AspectRatio>

			<ClayCard.Body>
				<ClayCard.Row>
					<ClayLayout.ContentCol expand>
						<ClayCard.Description
							disabled={disabled}
							displayType="title"
							href={href}
						>
							{name}
						</ClayCard.Description>

						{description && (
							<ClayCard.Description displayType="subtitle">
								{description}
							</ClayCard.Description>
						)}
					</ClayLayout.ContentCol>

					{actions && (
						<ClayLayout.ContentCol>
							<ClayDropDownWithItems
								items={actions}
								spritemap={spritemap}
								trigger={
									<ClayButtonWithIcon
										{...dropDownTriggerProps}
										className="component-action"
										disabled={disabled}
										displayType="unstyled"
										spritemap={spritemap}
										symbol="ellipsis-v"
									/>
								}
							/>
						</ClayLayout.ContentCol>
					)}
				</ClayCard.Row>
			</ClayCard.Body>
		</ClayCard>
	);
};
