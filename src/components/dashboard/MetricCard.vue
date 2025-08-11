<template>
  <div class="metric-card">
    <!-- Icon + Title -->
    <div class="metric-card__header">
      <div class="metric-card__icon-box">
        <i :class="['metric-card__icon', config.icon]"></i>
      </div>
      <h3 class="metric-card__title">{{ config.title }}</h3>
    </div>

    <!-- Value -->
    <p class="metric-card__value">
      {{ formattedValue }}
      <span v-if="config.suffix" class="metric-card__suffix"> {{ config.suffix }}</span>
    </p>

    <!-- Action -->
    <div class="metric-card__action" v-if="config.actionText && config.actionTo">
      <router-link :to="config.actionTo" class="metric-card__link">
        {{ config.actionText }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MetricCard',

  props: {
    type: {
      type: String,
      required: true
    },
    mainValue: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      animatedValue: 0
    }
  },

  computed: {
    config() {
      switch (this.type) {
        case 'appointments':
          return {
            icon: 'ri-calendar-check-fill',
            title: 'Patients Today',
            suffix: 'Quotes',
            actionText: 'See All Patients',
            actionTo: '/patients'
          }
        case 'prescriptions':
          return {
            icon: 'ri-capsule-fill',
            title: 'Recipes Today',
            suffix: 'Recipes',
            actionText: 'Review All Prescriptions',
            actionTo: '/prescriptions'
          }
        default:
          return {
            icon: 'ri-information-line',
            title: 'Unknown',
            suffix: '',
            actionText: '',
            actionTo: ''
          }
      }
    },

    formattedValue() {
      return this.animatedValue.toLocaleString('en-US')
    }
  },

  mounted() {
    this.animateValue()
  },

  methods: {
    animateValue() {
      const raw =
        typeof this.mainValue === 'string'
          ? parseFloat(this.mainValue.replace(/[^\d.-]/g, ''))
          : Number(this.mainValue)

      const target = isNaN(raw) ? 0 : raw
      const duration = 1000
      const start = performance.now()

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1)
        this.animatedValue = Math.floor(progress * target)
        if (progress < 1) requestAnimationFrame(step)
        else this.animatedValue = target
      }

      requestAnimationFrame(step)
    }
  }
}
</script>

<style scoped>
.metric-card {
  flex: 1 1 260px;
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.metric-card:hover {
  border-color: #3b82f6;
  box-shadow: 0 8px 28px rgba(59, 130, 246, 0.12);
}

/* =========== Header =========== */
.metric-card__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.7rem;
}

.metric-card__icon-box {
  width: 40px;
  height: 40px;
  border-radius: 0.75rem;
  background-color: #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-card__icon {
  font-size: 1.25rem;
  color: #3b82f6;
}

.metric-card__title {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
  font-family: 'Manrope', sans-serif;
}

/* =========== Value =========== */
.metric-card__value {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  margin: 0;
}

.metric-card__suffix {
  font-size: 1rem;
  font-family:Verdana, Geneva, Tahoma, sans-serif;
  color: #64748b;
  font-weight: 600;
  margin-left: 0.25rem;
  letter-spacing: 0.5px;
}

/* =========== Action =========== */
.metric-card__action {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.metric-card__link {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #2563eb; 
  cursor: pointer;
  transition: color 0.25s ease, transform 0.25s ease;
  position: relative;
}

.metric-card__link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0%;
  height: 1.5px;
  background-color: currentColor;
  transition: width 0.25s ease;
  border-radius: 2px;
}

.metric-card__link:hover {
  color: #1e40af; 
  transform: translateY(-1px);
}

.metric-card__link:hover::after {
  width: 100%;
}
</style>
