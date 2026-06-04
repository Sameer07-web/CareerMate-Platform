import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';
import { SPACING, BORDER_RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { applicationService } from '../../services/applicationService';
import LoadingState from '../../components/LoadingState';
import EmptyState from '../../components/EmptyState';
import SectionHeader from '../../components/SectionHeader';

const ApplicationCard = ({ app }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return COLORS.primary;
      case 'Interview Scheduled': return COLORS.warning;
      case 'Rejected': return '#EF4444'; // Red
      case 'Offer': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.companyInfo}>
          <View style={styles.iconPlaceholder}>
            <Ionicons name="business" size={24} color={COLORS.textPrimary} />
          </View>
          <View>
            <Text style={styles.companyName}>{app.company}</Text>
            <Text style={styles.roleName}>{app.role}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.dateText}>{app.date}</Text>
        </View>
        
        <View style={[styles.statusBadge, { borderColor: getStatusColor(app.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(app.status) }]}>
            {app.status}
          </Text>
        </View>
      </View>
    </View>
  );
};

const filterTabs = ['All', 'Applied', 'Interview Scheduled', 'Rejected', 'Offer'];

const ApplicationsScreen = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    const data = await applicationService.getApplications();
    setApps(data);
    setLoading(false);
  };

  if (loading) {
    return <LoadingState message="Loading Applications..." />;
  }

  // Derived stats
  const totalApplied = apps.length;
  const totalInterview = apps.filter(a => a.status === 'Interview Scheduled').length;
  const totalRejected = apps.filter(a => a.status === 'Rejected').length;
  const totalOffers = apps.filter(a => a.status === 'Offer').length;

  const getPercent = (count) => totalApplied ? Math.round((count / totalApplied) * 100) : 0;

  // Filtered list
  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || app.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SectionHeader title="Application Tracker" />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{totalApplied}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: COLORS.warning }]}>{totalInterview}</Text>
          <Text style={styles.statLabel}>Interview ({getPercent(totalInterview)}%)</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: '#EF4444' }]}>{totalRejected}</Text>
          <Text style={styles.statLabel}>Rejected ({getPercent(totalRejected)}%)</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: COLORS.success }]}>{totalOffers}</Text>
          <Text style={styles.statLabel}>Offers ({getPercent(totalOffers)}%)</Text>
        </View>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search company or role..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filterTabs.map((tab) => (
            <TouchableOpacity 
              key={tab} 
              style={[styles.filterPill, activeFilter === tab && styles.filterPillActive]}
              onPress={() => setActiveFilter(tab)}
            >
              <Text style={[styles.filterText, activeFilter === tab && styles.filterTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {filteredApps.length === 0 ? (
        <EmptyState title="No matches found" message="Try adjusting your search or filters." />
      ) : (
        <FlatList
          data={filteredApps}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => <ApplicationCard app={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statBox: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.sm,
    padding: SPACING.sm,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statNum: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontSize: 10,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: COLORS.textPrimary,
    ...TYPOGRAPHY.body,
  },
  filterWrapper: {
    marginBottom: SPACING.md,
  },
  filterScroll: {
    paddingHorizontal: SPACING.lg,
  },
  filterPill: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.card,
  },
  filterPillActive: {
    backgroundColor: 'rgba(79, 70, 229, 0.2)',
    borderColor: COLORS.primary,
  },
  filterText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  companyName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  roleName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    fontWeight: 'bold',
  }
});

export default ApplicationsScreen;
