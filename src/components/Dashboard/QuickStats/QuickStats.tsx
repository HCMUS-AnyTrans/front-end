'use client';

import React from 'react';
import StatCard, { StatCardProps } from './StatCard';

type QuickStatsComponent = React.FC & { StatCard: React.FC<StatCardProps> };

const QuickStats = (() => null) as unknown as QuickStatsComponent;
QuickStats.StatCard = StatCard;

export default QuickStats;
