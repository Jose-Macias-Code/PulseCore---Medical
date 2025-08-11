<template>
  <div class="monthly-chart-card">
    <!-- Header -->
    <div class="monthly-chart-card__header">
      <h2 class="monthly-chart-card__title">Patient Growth</h2>
      <p class="monthly-chart-card__subtitle">New patients vs prescriptions for the current month</p>
    </div>

    <!-- Chart -->
    <div class="monthly-chart-card__canvas-wrapper">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
)

export default {
  name: 'MonthlyActivityChart',

  props: {
    labels: {
      type: Array,
      required: true
    },
    tooltipLabels: {
      type: Array,
      required: true
    },
    datasets: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const chartRef = ref(null)
    let chartInstance = null

    const renderChart = () => {
      if (!chartRef.value) return

      chartInstance = new Chart(chartRef.value, {
        type: 'line',
        data: {
          labels: props.labels,
          datasets: props.datasets 
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: '#64748b',
                font: { family: 'Manrope', size: 12 }
              },
              grid: { display: false }
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: '#64748b',
                font: { family: 'Manrope', size: 12 }
              },
              grid: {
                color: 'rgba(100,116,139,0.1)',
                borderDash: [4, 4]
              }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#1e293b',
                font: { family: 'Manrope', size: 13 }
              }
            },
            tooltip: {
              backgroundColor: '#1e293b',
              titleFont: { family: 'Manrope', size: 13 },
              bodyFont: { family: 'Manrope', size: 12 },
              padding: 10,
              callbacks: {
                title: (tooltipItems) => {
                  const index = tooltipItems[0]?.dataIndex
                  const label = props.tooltipLabels[index] || `Day ${index + 1}`
                  return `Day ${index + 1} - ${label}`
                }
              }
            }
          }
        }
      })
    }

    onMounted(() => renderChart())

    onBeforeUnmount(() => {
      if (chartInstance) {
        chartInstance.destroy()
      }
    })

    return {
      chartRef
    }
  }
}
</script>

<style scoped>
.monthly-chart-card {
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  max-height: 360px;
}

.monthly-chart-card__header {
  margin-bottom: 1rem;
}

.monthly-chart-card__title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.monthly-chart-card__subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
  margin: 0.15rem 0 0;
}

.monthly-chart-card__canvas-wrapper {
  position: relative;
  width: 100%;
  height: 300px;
}

canvas {
  height: 100% !important;
  width: 100% !important;
}
</style>