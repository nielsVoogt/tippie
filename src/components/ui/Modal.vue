<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <span class="modal-title">
            {{ title }}
          </span>
          <button
            type="button"
            class="modal-close"
            @click="close()"
            aria-label="Close modal"
          >
            <XIcon />
          </button>
        </header>
        <form ref="modalForm">
          <section class="modal-body" id="modalDescription">
            <slot name="body" />
          </section>
          <footer class="modal-footer">
            <Button
              class="modal-cancel-button"
              aria-label="Close modal"
              @click="close()"
              type="button"
              >Cancel</Button
            >
            <slot name="footer-buttons" />
          </footer>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { XIcon } from "vue-feather-icons";
import Button from "@/components/ui/Button";

export default {
  name: "Modal",
  components: {
    XIcon,
    Button,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close");
      setTimeout(() => this.$refs.modalForm.reset(), 200);
    },
  },
};
</script>

<style scoped lang="scss">
/* BACKDROP */
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* MODAL */

.modal {
  background: #ffffff;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;

  .modal-header,
  .modal-footer {
    display: flex;
    align-items: center;
  }

  .modal-header {
    padding: 1.5em;
    justify-content: space-between;

    .modal-close {
      line-height: 1;

      svg {
        display: block;
      }
    }

    .modal-title {
      font-weight: bold;
      font-size: 1.125rem;
      color: black;
    }
  }

  /* BODY */

  .modal-body {
    position: relative;
    padding: 0 1.5em 1.5em 1.5em;
  }

  /* FOOTER */

  .modal-footer {
    background: #f3f3f3;
    padding: 1.5em;
    justify-content: flex-end;

    .modal-cancel-button {
      margin-right: auto;
    }
  }
}

/* TRANSITION */

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease-out;
}
</style>