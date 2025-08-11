<template>
  <div class="gender-chart-card">
    <!-- Header -->
    <div class="gender-chart-card__header">
      <h2 class="gender-chart-card__title">Gender Distribution</h2>
      <p class="gender-chart-card__subtitle">
        All-time registered patients by gender
      </p>
    </div>

    <!-- Chart + Badges -->
    <div class="gender-chart-card__content">
      <div class="gender-chart-card__canvas-wrapper">
        <canvas ref="chartRef"></canvas>
      </div>

      <div class="gender-chart-card__badges">
        <div class="gender-badge">
          <i class="ri-men-line gender-icon male"></i>
          <span>{{ maleCount }} M</span>
        </div>
        <div class="gender-badge">
          <i class="ri-women-line gender-icon female"></i>
          <span>{{ femaleCount }} F</span>
        </div>
        <div
          class="gender-badge"
          v-if="otherCount > 0"
        >
          <i class="ri-genderless-line gender-icon other"></i>
          <span>{{ otherCount }} Other</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

export default {
  name: 'GenderPieChartCard',
  props: {
    maleCount: { type: Number, required: true },
    femaleCount: { type: Number, required: true },
    otherCount: { type: Number, default: 0 }
  },
  setup(props) {
    const chartRef = ref(null)
    let chartInstance = null

    const renderChart = () => {
      if (!chartRef.value) return

      const total = props.maleCount + props.femaleCount + props.otherCount

      chartInstance = new Chart(chartRef.value, {
        type: 'pie',
        data: {
          labels: ['Male', 'Female', 'Other'],
          datasets: [
            {
              data: [props.maleCount, props.femaleCount, props.otherCount],
              backgroundColor: ['#60a5fa', '#f472b6', '#64748b'],
              borderColor: '#ffffff',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#1e293b',
                font: { family: 'Manrope', size: 13 }
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label
                  const value = context.raw
                  const percentage = ((value / total) * 100).toFixed(1)
                  return `${label}: ${value} (${percentage}%)`
                }
              },
              backgroundColor: '#1e293b',
              titleFont: { family: 'Manrope', size: 13 },
              bodyFont: { family: 'Manrope', size: 12 },
              padding: 10
            }
          }
        }
      })
    }

    onMounted(renderChart)
    onBeforeUnmount(() => {
      if (chartInstance) chartInstance.destroy()
    })

    return { chartRef }
  }
}
</script>

<style scoped>
.gender-chart-card {
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.gender-chart-card__header {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.gender-chart-card__title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.gender-chart-card__subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

.gender-chart-card__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.gender-chart-card__canvas-wrapper {
  flex: 1 1 200px;
  min-width: 180px;
  max-width: 300px;
}

canvas {
  width: 100% !important;
  height: auto !important;
}

.gender-chart-card__badges {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-family: 'Manrope', sans-serif;
}

.gender-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1e293b;
}

.gender-icon {
  font-size: 1.2rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background-color: #f1f5f9;
}

.gender-icon.male {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.gender-icon.female {
  background-color: rgba(236, 72, 153, 0.1);
  color: #ec4899;
}

.gender-icon.other {
  background-color: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}
</style>