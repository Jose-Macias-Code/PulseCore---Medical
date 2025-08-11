<template>
  <div class="users-table-container">
    <table class="users-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td class="cell-name">{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span :class="['status-badge', user.status === 1 ? 'active' : 'inactive']">
              {{ user.status === 1 ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>{{ formatDate(user.created_at) }}</td>
          <td class="cell-actions">
            <button class="icon-btn edit" @click="$emit('edit', user)">
              <i class="ri-pencil-line"></i>
            </button>
            <button class="icon-btn delete" @click="$emit('delete', user)">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="6" class="no-data">No users found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UsersTable',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '—';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    }
  }
}
</script>

<style scoped>
.users-table-container {
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
}

.users-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.users-table td {
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.cell-name {
  font-weight: 600;
  color: #1e293b;
}

/* ========== Actions ========== */
.cell-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: left;
  align-items: center;
}

.icon-btn {
  all: unset;
  cursor: pointer;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.icon-btn.edit {
  color: #0d9488;
  border: 1.5px solid rgba(13, 148, 136, 0.2);
  background-color: rgba(13, 148, 136, 0.05);
}

.icon-btn.edit:hover {
  background-color: rgba(13, 148, 136, 0.15);
  transform: translateY(-1px) scale(1.05);
}

.icon-btn.delete {
  color: #dc2626;
  border: 1.5px solid rgba(220, 38, 38, 0.2);
  background-color: rgba(220, 38, 38, 0.05);
}

.icon-btn.delete:hover {
  background-color: rgba(220, 38, 38, 0.15);
  transform: translateY(-1px) scale(1.05);
}

/* ========== Status ========== */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 9999px;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: background-color 0.25s ease, color 0.25s ease;
  line-height: 1;
}

.status-badge.active {
  background-color: rgba(22, 163, 74, 0.15);
  color: #16a34a;
  border: 1px solid rgba(22, 163, 74, 0.25);
}

.status-badge.inactive {
  background-color: rgba(220, 38, 38, 0.1);
  color: #dc2626;
  border: 1px solid rgba(220, 38, 38, 0.2);
}

/* ========== No Data ========== */
.no-data {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}
</style>