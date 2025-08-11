<template>
  <div> 
    <!-- Title and subtitle -->
    <section class="dashboard-header">
      <h1 class="dashboard-header__title">Dashboard</h1>
      <p class="dashboard-header__subtitle">
        Monitor key metrics, review activity, and stay ahead.
      </p>
    </section>

    <!-- Metrics Cards -->
    <div class="metrics-row">
      <MetricCard
        v-for="card in rawKpiStats"
        :key="card.type"
        :type="card.type"
        :mainValue="card.value"
      />
    </div>

    <!-- Monthly Activity -->
    <div class="monthy-chart">
      <MonthlyActivityChart 
        :labels="chartLabels" 
        :tooltip-labels="tooltipLabels" 
        :datasets="chartDatasets" 
      />
    </div>

    <!-- Upcoming Appointments + Reminders -->
    <div class="dashboard-panels">
      <TopPrescribedDrugsTable :drugs="topPrescribedDrugs" />
      <QuickTrendsPanel :trends="quickTrends" />
    </div>
  </div>
</template>

<script>
import MetricCard from '../components/dashboard/MetricCard.vue'
import MonthlyActivityChart from '../components/dashboard/MonthlyActivityChart.vue'
import TopPrescribedDrugsTable  from '../components/dashboard/TopPrescribedDrugsTable .vue'
import QuickTrendsPanel from '../components/dashboard/QuickTrendsPanel.vue'

export default {
  name: 'DashboardView',

  components: {
    MetricCard,
    MonthlyActivityChart,
    TopPrescribedDrugsTable ,
    QuickTrendsPanel
  },

  data() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const { chartLabels, tooltipLabels } = generateDateLabels(year, month, daysInMonth)

    return {
      rawKpiStats: [
        { type: 'appointments', value: 8 },
        { type: 'prescriptions', value: 5 },
      ],

      chartLabels,
      tooltipLabels,
      rawChartStats: [
        {
          type: 'new_patients',
          values: [
            2, 1, 3, 0, 4, 2, 1, 5, 3, 2,
            4, 1, 0, 3, 2, 4, 1, 2, 3, 5,
            2, 1, 0, 3, 4, 2, 1, 3, 2, 4
          ]
        },
        {
          type: 'daily_prescriptions',
          values: [
            6, 5, 8, 4, 9, 7, 5, 10, 8, 6,
            9, 5, 4, 7, 6, 9, 5, 7, 8, 11,
            7, 6, 4, 8, 9, 7, 5, 8, 6, 10
          ]
        }
      ],

      topPrescribedDrugs: [
        {
          id: 1,
          name: 'Paracetamol',
          prescriptions: 42,
          route: 'Oral',
          type: 'Tablet'
        },
        {
          id: 2,
          name: 'Amoxicillin',
          prescriptions: 31,
          route: 'Oral',
          type: 'Capsule'
        },
        {
          id: 3,
          name: 'Salbutamol',
          prescriptions: 27,
          route: 'Inhalation',
          type: 'Inhaler'
        },
        {
          id: 4,
          name: 'Ibuprofen',
          prescriptions: 25,
          route: 'Oral',
          type: 'Tablet'
        },
        {
          id: 5,
          name: 'Diclofenac',
          prescriptions: 18,
          route: 'Intramuscular',
          type: 'Injection'
        }
      ],

      quickTrends: [
        {
          id: 1,
          type: 'patients_vs_yesterday',
          label: 'Patients vs Yesterday',
          value: 15, 
          current: 8,
          previous: 7
        },
        {
          id: 2,
          type: 'weekly_prescriptions',
          label: 'Prescriptions this Week',
          value: 26,
          delta: 4 
        },
        {
          id: 3,
          type: 'new_patients',
          label: 'New Patients Registered',
          value: 5,
          period: 'this_week'
        }
      ]
    }
  },

  computed: {
    chartDatasets() {
      return this.rawChartStats.map(stat => {
        const configMap = {
          new_patients: {
            label: 'New Patients',
            borderColor: '#6366f1', 
            backgroundColor: 'rgba(99, 102, 241, 0.1)'
          },
          daily_prescriptions: {
            label: 'Prescriptions',
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.1)'
          }
        }

        const config = configMap[stat.type] || {
          label: 'Unknown',
          borderColor: '#64748b',
          backgroundColor: 'rgba(100, 116, 139, 0.1)'
        }

        return {
          label: config.label,
          data: normalizeData(stat.values, this.chartLabels.length),
          borderColor: config.borderColor,
          backgroundColor: config.backgroundColor,
          tension: 0.3,
          fill: true,
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4
        }
      })
    }
  }
}

function generateDateLabels(year, month, totalDays) {
  const chartLabels = []
  const tooltipLabels = []

  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i)
    const weekday = capitalize(date.toLocaleDateString('en-US', { weekday: 'long' }))
    chartLabels.push(i.toString())
    tooltipLabels.push(`${weekday} ${i}`)
  }

  return { chartLabels, tooltipLabels }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function normalizeData(data, targetLength) {
  const padded = [...data]
  while (padded.length < targetLength) padded.push(0)
  return padded.slice(0, targetLength)
}
</script>

<style scoped>
/* =========== Header =========== */
.dashboard-header {
  margin-bottom: 2rem;
}

.dashboard-header__title {
  font-family: 'Manrope', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0;
}

.dashboard-header__subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1.3;
  margin-top: 0.15rem;
}

/* =========== Metrics Cards =========== */
.metrics-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* =========== Monthy Chart =========== */
.monthy-chart {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

/* =========== Upcoming Appointments + Reminders =========== */
.dashboard-panels {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 1068px) {
  .dashboard-panels {
    grid-template-columns: 1fr;
  }
}

</style>
