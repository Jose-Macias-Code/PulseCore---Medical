<template>
  <form class="filters-container" @submit.prevent>
    <!-- Search input -->
    <div class="filter-group">
      <label class="filter-label" for="search">Search Patient</label>
      <div class="search-wrapper">
        <i class="ri-search-line search-icon"></i>
        <input
          id="search"
          v-model="filters.searchQuery"
          type="text"
          placeholder="Search by name or phone..."
          class="search-input"
        />
      </div>
    </div>

    <!-- Gender select -->
    <div class="filter-group">
      <label class="filter-label" for="range">Date</label>
      <div class="select-wrapper">
        <select v-model="filters.range" id="range" class="filter-select">
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <i class="ri-arrow-down-s-line select-icon"></i>
      </div>
    </div>

    <!-- Clear filters -->
    <button type="button" class="clear-button" :disabled="!hasFilters" @click="clearFilters">
      Clear Filters
    </button>
  </form>
</template>

<script>
export default {
  name: 'PrescriptionsFilters',
  emits: ['filter-change'],
  data() {
    return {
      filters: {
        searchQuery: '',
        range: '', 
      },
    }
  },
  computed: {
    hasFilters() {
      return (
        this.filters.searchQuery.trim() !== '' ||
        this.filters.range !== ''
      )
    },
  },
  watch: {
    filters: {
      handler(newFilters) {
        this.$emit('filter-change', { ...newFilters })
      },
      deep: true,
    },
  },
  methods: {
    clearFilters() {
      this.filters = {
        searchQuery: '',
        range: '',
      }
    },
  },
}
</script>

<style scoped>
* {
  font-family: 'Manrope', sans-serif;
}

.filters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 2rem;
  align-items: flex-end;
  padding-left: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 180px;
}

.filter-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #475569;
}

/* ========== Search Input ========== */
.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.search-wrapper:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  background-color: #fff;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  font-size: 1.25rem;
  color: #64748b;
  pointer-events: none;
}

.search-input {
  all: unset;
  font-size: 0.90rem;
  color: #0f172a;
  width: 100%;
  line-height: 1.5;
}

.search-input::placeholder {
  color: #94a3b8;
}

/* ========== Gender Select ========== */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
  border: 1px solid #cbd5e1;
  border-radius: 0.75rem;
  padding-right: 2.5rem;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  max-width: 120px;
}

.select-wrapper:hover {
  background: linear-gradient(to right, #eef2f7, #e2e8f0);
}

.select-wrapper:focus-within {
  border-color: #3b82f6;
  background: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.filter-select {
  all: unset;
  font-size: 0.95rem;
  font-weight: 600; 
  color: #1e293b;
  padding: 0.5rem 0.75rem;
  width: 100%;
  background-color: transparent;
  appearance: none;
  cursor: pointer;
  letter-spacing: 0.2px;
}

.filter-select option {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #0f172a;
  background-color: white;
}

.select-icon {
  position: absolute;
  right: 0.85rem;
  font-size: 1.2rem;
  color: #94a3b8;
  pointer-events: none;
  transition: transform 0.2s ease;
}

.select-wrapper:focus-within .select-icon {
  transform: rotate(180deg);
}

/* ========== Clear Button ========== */
.clear-button {
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  height: 2.5rem;
  color: #1e293b;
  cursor: pointer;
  background-color: #e2e8f0;
  border: 1px solid transparent;

  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease,
    opacity 0.25s ease;
}

.clear-button:hover:enabled {
  background-color: #cbd5e1;
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 10px rgba(100, 116, 139, 0.12);
  border-color: #94a3b8;
}

.clear-button:disabled {
  background-color: #f1f5f9;
  color: #94a3b8;
  cursor: not-allowed;
  opacity: 0.65;
  border: 1.5px dashed #cbd5e1;
  transform: none;
  box-shadow: none;
}
</style>