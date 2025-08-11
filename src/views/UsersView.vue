<template>
  <div>
    <!-- Title, subtitle and action button -->
    <section class="users-header">
      <div class="users-header__text">
        <h1 class="users-header__title">Users</h1>
        <p class="users-header__subtitle">
          Manage users with full control and flexibility.
        </p>
      </div>

      <button class="add-user-button" @click="showCreateModal = true">
        <i class="ri-user-settings-line icon"></i>
        New User
      </button>
    </section>  

    <!-- Table Users -->
    <UsersTable 
      :users="users"
      @delete="onDeleteUser" 
      @edit="onEditUser"
    />

    <!-- Delete -->
    <DeleteUser
      v-if="showDeleteModal"
      :user="userToDelete"
      @cancel="showDeleteModal = false"
      @confirm-delete="confirmDelete"
    />

    <!-- Creatre -->
    <CreateUserModal
      v-if="showCreateModal"
      @cancel="showCreateModal = false"
      @create="addUser"
    />

    <!-- Edit -->
    <EditUserModal
      v-if="showEditModal"
      :user="userToEdit"
      @cancel="showEditModal = false"
      @update="updateUser"
    />
    
  </div>
</template>

<script>
import UsersTable from '../components/users/UsersTable.vue'
import CreateUserModal from '../components/users/CreateUserModal.vue'
import EditUserModal from '../components/users/EditUserModal.vue'
// Action Delete
import DeleteUser from '../components/users/actions/DeleteUser.vue'

export default {
  name: 'UsersView',
  components: {
    UsersTable,
    DeleteUser,
    CreateUserModal,
    EditUserModal
  },
  data() {
    return {
      users: [
        {
          id: 1,
          name: 'Dr. Alan Grant',
          email: 'alan.grant@example.com',
          status: 1,
          created_at: '2025-06-01 14:23:00'
        },
        {
          id: 2,
          name: 'Dr. Ellie Sattler',
          email: 'ellie.sattler@example.com',
          status: 0,
          created_at: '2025-05-12 09:45:00'
        },
        {
          id: 3,
          name: 'Dr. Ian Malcolm',
          email: 'ian.malcolm@example.com',
          status: 1,
          created_at: '2025-03-22 16:30:00'
        }
      ],
      showDeleteModal: false,
      userToDelete: null,
      showCreateModal: false,
      showEditModal: false,
      userToEdit: null,
    }
  },

  methods: {
    // Add User
    addUser(user) {
      this.users.unshift(user)
      this.showCreateModal = false
    },
    // Edit User
    onEditUser(user) {
      this.userToEdit = { ...user };
      this.showEditModal = true;
    },

    updateUser(updatedUser) {
      const index = this.users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        this.users[index] = { ...updatedUser };
      }
      this.showEditModal = false;
      this.userToEdit = null;
    },
    // Eliminate User
    onDeleteUser(user) {
      this.userToDelete = user
      this.showDeleteModal = true
    },
    confirmDelete() {
      this.users = this.users.filter(
        (u) => u.id !== this.userToDelete.id
      )
      this.showDeleteModal = false
      this.userToDelete = null
    },
  }
}
</script>

<style scoped>
/* =========== Header =========== */
.users-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'Manrope', sans-serif;
}

.users-header__text {
  display: flex;
  flex-direction: column;
}

.users-header__title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0;
}

.users-header__subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1.3;
  margin-top: 0.15rem;
}

.add-user-button {
  background-color: #3b82f6;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.add-user-button:hover {
  background-color: #2563eb;
}

.add-user-button .icon {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1;
}
</style>
