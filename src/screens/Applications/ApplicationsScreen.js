import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SPACING, BORDER_RADIUS, TYPOGRAPHY } from '../../theme';
import { fetchApplications, createApplication, updateApplication, deleteApplication } from '../../store/applicationsSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import AppHeader from '../../components/common/AppHeader';
import ApplicationFormModal from '../../components/ApplicationFormModal';

const ApplicationCard = ({ app, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return COLORS.info;
      case 'interviewing': return COLORS.warning;
      case 'rejected': return COLORS.error;
      case 'offered': return COLORS.success;
      case 'saved':
      default: return COLORS.textSecondary;
    }
  };

  const getDisplayStatus = (status) => {
    const map = {
      'applied': 'Applied',
      'interviewing': 'Interviewing',
      'rejected': 'Rejected',
      'offered': 'Offered',
      'saved': 'Saved'
    };
    return map[status] || 'Saved';
  };

  const confirmDelete = () => {
    Alert.alert('Delete Application', 'Are you sure you want to delete this application?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => onDelete(app._id) }
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.companyInfo}>
          <View style={styles.iconPlaceholder}>
            <Text style={styles.iconInitial}>{app.companyName.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.companyTextContainer}>
            <Text style={styles.companyName} numberOfLines={1}>{app.companyName}</Text>
            <Text style={styles.roleName} numberOfLines={1}>{app.positionTitle}</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity onPress={() => onEdit(app)} style={styles.actionBtn}>
            <Ionicons name="pencil" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={confirmDelete} style={styles.actionBtn}>
            <Ionicons name="trash" size={18} color={COLORS.error} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.dateText}>{new Date(app.createdAt).toLocaleDateString()}</Text>
        </View>
        
        <View style={[styles.statusBadge, { borderColor: getStatusColor(app.status) }]}>
          <Text style={[styles.statusText, { color: getStatusColor(app.status) }]}>
            {getDisplayStatus(app.status)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const filterTabs = ['All', 'Saved', 'Applied', 'Interviewing', 'Rejected', 'Offered'];

const ApplicationsScreen = () => {
  const dispatch = useDispatch();
  const { items: apps, status, error } = useSelector(state => state.applications);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchApplications());
    }
  }, [status, dispatch]);

  const handleAdd = () => {
    setEditingApp(null);
    setModalVisible(true);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setModalVisible(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteApplication(id));
  };

  const handleFormSubmit = async (data) => {
    if (editingApp) {
      await dispatch(updateApplication({ id: editingApp._id, data })).unwrap();
    } else {
      await dispatch(createApplication(data)).unwrap();
    }
    setModalVisible(false);
  };

  if (status === 'loading' && apps.length === 0) {
    return <LoadingSpinner />;
  }

  if (status === 'failed' && apps.length === 0) {
    return <ErrorState message={error} onRetry={() => dispatch(fetchApplications())} />;
  }

  // Filtered list
  const filteredApps = apps.filter((app) => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.positionTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || app.status.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={styles.container}>
      <AppHeader 
        title="Applications" 
        rightElement={
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add-circle" size={28} color={COLORS.primary} />
          </TouchableOpacity>
        }
      />
      
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
        <EmptyState title="No applications found" message="Add a new application to track your job search." />
      ) : (
        <FlatList
          data={filteredApps}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <ApplicationCard app={item} onEdit={handleEdit} onDelete={handleDelete} />}
          refreshing={status === 'loading'}
          onRefresh={() => dispatch(fetchApplications())}
        />
      )}

      <ApplicationFormModal 
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleFormSubmit}
        initialData={editingApp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    marginVertical: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.sizes.md,
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
    fontSize: TYPOGRAPHY.sizes.sm,
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
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  iconInitial: {
    color: COLORS.primaryLight,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: 'bold',
  },
  companyTextContainer: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  companyName: {
    fontSize: TYPOGRAPHY.sizes.lg,
    fontFamily: TYPOGRAPHY.fontFamily.semiBold,
    color: COLORS.textPrimary,
  },
  roleName: {
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  actionRow: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: SPACING.xs,
    marginLeft: SPACING.xs,
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
    fontSize: TYPOGRAPHY.sizes.xs,
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
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: 'bold',
  }
});
export default ApplicationsScreen;
