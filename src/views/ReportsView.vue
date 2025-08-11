<template>
  <div>
    <!-- Title and subtitle -->
    <section class="reports-header">
      <h1 class="reports-header__title">Reports</h1>
      <p class="reports-header__subtitle">
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

    <!-- Chart + Table -->
    <div class="gender-and-drugs-row">
      <GenderPieChartCard
        :male-count="genderDistribution.male"
        :female-count="genderDistribution.female"
        :other-count="genderDistribution.other"
      />
      <TopPrescribedDrugsTable :drugs="topPrescribedDrugs" />
    </div>
  </div>
</template>

<script>
import MetricCard from '../components/reports/MetricCard.vue'
import GenderPieChartCard from '../components/reports/GenderPieChartCard.vue'
import TopPrescribedDrugsTable  from '../components/reports/TopPrescribedDrugsTable .vue'

export default {
  name: 'reportsView',

  components: {
    MetricCard,
    GenderPieChartCard,
    TopPrescribedDrugsTable ,
  },

  data() {
    return {
      rawKpiStats: [
        { type: 'patients', value: 224 },
        { type: 'prescriptions', value: 410 },
        { type: 'medications', value: 65 },
      ],

      genderDistribution: {
        male: 120,
        female: 95,
        other: 9
      },

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
      ]
    }
  },
}
</script>

<style scoped>
/* =========== Header =========== */
.reports-header {
  margin-bottom: 2rem;
}

.reports-header__title {
  font-family: 'Manrope', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0;
}

.reports-header__subtitle {
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

/* =========== Gender + Drugs Table Row =========== */
.gender-and-drugs-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 1068px) {
  .gender-and-drugs-row {
    grid-template-columns: 1fr;
  }
}

</style>