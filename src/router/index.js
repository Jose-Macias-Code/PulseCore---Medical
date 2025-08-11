// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginApp.vue'
import DashboardView from '../views/DashboardView.vue'
import PatientsView from '../views/PatientsView.vue'
import PatientCreateView from '../views/patients/PatientCreateView.vue'
import PrescriptionListView from '../views/PrescriptionListView.vue'
import PrescriptionCreateView from '../views/prescriptions/PrescriptionCreateView.vue'
import PrescriptionEditView from '../views/prescriptions/PrescriptionEditView.vue'
import PatientPrescriptionsView from '../views/prescriptions/PatientPrescriptionsView.vue'
import ReportsView from '../views/ReportsView.vue'
import UsersView from '../views/UsersView.vue'

const routes = [
  { path: '/', name: 'login', component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/patients', name: 'patients', component: PatientsView },
  { path: '/patients/create', name: 'patients-create', component: PatientCreateView },
  { path: '/prescriptions', name: 'prescriptions', component: PrescriptionListView },
  { path: '/prescriptions/create', name: 'prescriptions-create', component: PrescriptionCreateView },
  { path: '/prescriptions/:id/edit', name: 'prescriptions-edit', component: PrescriptionEditView },
  { path: '/prescriptions/:id/view', name: 'prescriptions-view', component: PatientPrescriptionsView },
  { path: '/reports', name: 'reports', component: ReportsView },
  { path: '/users', name: 'users', component: UsersView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
