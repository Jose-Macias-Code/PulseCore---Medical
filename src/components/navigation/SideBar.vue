<template>
  <aside class="sidebar">
    <!-- Logo section -->
    <div class="sidebar__top">
      <img src="../../assets/sidebar-img/logo-img.png" alt="PulseCore Logo" class="sidebar__logo" />
      <span class="sidebar__brand"></span>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__menu">
      <ul>
        <li
          v-for="item in navItems"
          :key="item.label"
          :class="['sidebar__item', { active: activeItem === item.label }]"
          @click="handleNavigation(item)"
        >
          <i :class="`${item.icon} sidebar__icon`"></i>
          <span>{{ item.label }}</span>
        </li>
      </ul>
    </nav>

    <!-- Sign out -->
    <div class="sidebar__bottom">
      <button class="sidebar__logout" @click="signOut">
        <i class="ri-logout-box-r-line"></i>
        <span>Sign out</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SideBar',

  data() {
    return {
      navItems: [
        { label: 'Dashboard', icon: 'ri-dashboard-fill', route: '/dashboard' },
        { label: 'Patients', icon: 'ri-user-3-fill', route: '/patients' },
        { label: 'Prescriptions', icon: 'ri-clipboard-fill', route: '/prescriptions' },
        { label: 'Reports', icon: 'ri-pie-chart-2-fill', route: '/reports' },
        { label: 'Users', icon: 'ri-user-settings-fill', route: '/users' },
      ]
    };
  },

  computed: {
    activeItem() {
      const current = this.$route.path
      const match = this.navItems.find((item) => item.route === current)
      return match ? match.label : null
    }
  },

  methods: {
    handleNavigation(item) {
      if (this.$route.path !== item.route) {
        this.$router.push(item.route);
      }
    },

    signOut() {
      console.log('Signing out...');
      window.location.href = 'http://localhost:8080/';
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&display=swap');

.sidebar {
  height: 91%;
  width: 220px;
  background-color: #f1f5f9;
  border-radius: 1rem;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.03);
}

/* ========== Sidebar Top ========== */
.sidebar__top {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.sidebar__top::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 2px;
  background-color: #0f172a;
  border-radius: 999px;
}

.sidebar__logo {
  width: 39px;
  height: 39px;
  object-fit: contain;
  filter: grayscale(100%) brightness(0);
}

.sidebar__brand {
  font-family: 'Manrope', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.4px;
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
}

.sidebar__brand::before {
  content: 'Pulse';
  font-weight: 600;
  color: #0f172a;
}

.sidebar__brand::after {
  content: 'Core';
  font-weight: 700;
  color: #3b82f6;
  margin-left: 0.1rem;
}

/* ========== Sidebar Menu ========== */
.sidebar__menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  cursor: pointer;
  transition: all 0.25s ease;
  color: #1e293b;
  font-weight: 500;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  position: relative;
}

.sidebar__item:hover {
  background-color: #CCCCFF;
}

.sidebar__item.active {
  background-color: #3b82f6;
  color: #ffffff;
}

.sidebar__item.active .sidebar__icon {
  color: #ffffff;
}

.sidebar__icon {
  font-size: 1.2rem;
  color: #64748b;
  transition: color 0.3s;
}

/* ========== Sidebar Logout ========== */
.sidebar__bottom {
  margin-top: 1.5rem;
  position: relative;
  padding-top: 1.25rem;
}

.sidebar__bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 2px;
  background-color: #0f172a;
  border-radius: 999px;
}

.sidebar__logout {
  all: unset;
  width: 88%;
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 1rem;
  border-radius: 0.65rem;
  font-family: 'Manrope', sans-serif;
  font-size: 0.925rem;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  line-height: 1;
}

.sidebar__logout i {
  font-size: 1.05rem;
  color: #94a3b8;
  transition: color 0.3s ease;
}

.sidebar__logout:hover {
  background: rgba(100, 116, 139, 0.15); 
  color: #1e293b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.sidebar__logout:hover i {
  color: #1e293b;
}

.sidebar__logout:active {
  background-color: rgba(226, 232, 240, 0.5);
  box-shadow: inset 0 0 0 1px rgba(100, 116, 139, 0.2);
}
</style>