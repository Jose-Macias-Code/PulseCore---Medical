<template>
  <div class="trends-panel">
    <!-- Title -->
    <h2 class="trends-panel__title">Quick Trends</h2>

    <!-- Items -->
    <ul class="trends-list">
      <li
        v-for="trend in trends"
        :key="trend.id"
        class="trend-item"
      >
        <div class="trend-item__icon">
          <i :class="getRemixIconClass(trend.type)" class="icon" />
        </div>

        <div class="trend-item__content">
          <p class="trend-item__label">{{ trend.label }}</p>
          <p class="trend-item__value">{{ formatValue(trend) }}</p>
          <p class="trend-item__subtext">{{ formatSubtext(trend) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QuickTrendsPanel',

  props: {
    trends: {
      type: Array,
      required: true
    }
  },

  methods: {
    getRemixIconClass(type) {
      const map = {
        patients_vs_yesterday: 'ri-bar-chart-line',
        weekly_prescriptions: 'ri-clipboard-line',
        new_patients: 'ri-user-add-line'
      }
      return map[type] || 'ri-question-line'
    },

    formatValue(trend) {
      if (trend.type === 'patients_vs_yesterday') return `${trend.value > 0 ? '+' : ''}${trend.value}%`
      return trend.value
    },

    formatSubtext(trend) {
      if (trend.type === 'patients_vs_yesterday') return `${trend.current} today vs ${trend.previous} yesterday`
      if (trend.type === 'weekly_prescriptions') return `+${trend.delta} vs last week`
      if (trend.type === 'new_patients') return 'This week'
      return ''
    }
  }
}
</script>

<style scoped>
.trends-panel {
  background-color: #fff;
  border-radius: 1.25rem;
  padding: 0.8rem 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* =========== Title =========== */
.trends-panel__title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

/* =========== Item =========== */
.trends-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.trend-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1.5px solid #ccc;
  padding-bottom: 0.5rem;
  
}

.trend-item__icon .icon {
  font-size: 1.4rem;
  color: #3b82f6;
}

.trend-item__label {
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.trend-item__value {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0.1rem 0;
}

.trend-item__subtext {
  font-family: 'Manrope', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}
</style>
