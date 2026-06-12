import * as React from 'react';

export type SnsType = 'x' | 'instagram' | 'youtube' | 'website';

const SNS_CONFIG: Record<SnsType, { iconClass: string; label: string }> = {
    x: { iconClass: 'fa-brands fa-x-twitter', label: 'X' },
    instagram: { iconClass: 'fa-brands fa-instagram', label: 'Instagram' },
    youtube: { iconClass: 'fa-brands fa-youtube', label: 'YouTube' },
    website: { iconClass: 'fa-solid fa-globe', label: 'Website' },
};

type SnsIconProps = {
    type: SnsType;
    withMargin?: boolean;
};

export const SnsIcon: React.FC<SnsIconProps> = ({ type, withMargin = true }) => (
    <i
        className={`icon-circle${withMargin ? ' mr-1' : ''} ${SNS_CONFIG[type].iconClass}`}
        aria-hidden="true"
    />
);

type SnsLinkProps = {
    type: SnsType;
    href: string;
    showLabel?: boolean;
    withMargin?: boolean;
};

export const SnsLink: React.FC<SnsLinkProps> = ({ type, href, showLabel = false, withMargin = true }) => {
    const { label } = SNS_CONFIG[type];

    return (
        <a target="_blank" rel="noopener noreferrer" href={href}>
            {showLabel ? (
                <div className="mb-1 icon-text flex-align-center">
                    <SnsIcon type={type} withMargin={withMargin} />
                    <span>{label}</span>
                </div>
            ) : (
                <SnsIcon type={type} withMargin={withMargin} />
            )}
        </a>
    );
};
