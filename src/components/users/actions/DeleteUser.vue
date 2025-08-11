<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-content">
      <h2 class="modal-title">Delete User</h2>

      <p class="modal-text">
        <i class="ri-error-warning-line modal-icon-inline"></i>
        Are you sure you want to delete
        <strong class="danger-name">{{ user.name }}</strong>? This user will be permanently removed from the system and cannot be recovered.
      </p>

      <div class="modal-actions">
        <button class="btn cancel" @click="$emit('cancel')">
          <i class="ri-close-line"></i> Cancel
        </button>
        <button class="btn delete" @click="$emit('confirm-delete')">
          <i class="ri-delete-bin-line"></i> Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeleteUser',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  animation: fadeIn 0.25s ease-in-out;
}

/* ========== Modal ========== */
.modal-content {
  background-color: #ffffff;
  padding: 2rem;
  width: 90%;
  max-width: 420px;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  animation: scaleIn 0.25s ease-in-out;
  font-family: 'Manrope', sans-serif;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
}

.modal-text {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 1.8rem;
  line-height: 1.6;
}

.modal-icon-inline {
  font-size: 1.3rem;
  color: #ef4444;
  vertical-align: middle;
  margin-right: 0.5rem;
}

.danger-name {
  color: #dc2626;
  font-weight: 700;
}

/* ========== Buttons ========== */
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn {
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn i {
  font-size: 1.1rem;
  font-weight: 400;
}

.btn.cancel {
  background-color: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}

.btn.cancel:hover {
  background-color: #e2e8f0;
}

.btn.delete {
  background-color: #ef4444;
  color: white;
  border: 1px solid #dc2626;
}

.btn.delete:hover {
  background-color: #dc2626;
}

/* ========== Animations ========== */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.96);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>