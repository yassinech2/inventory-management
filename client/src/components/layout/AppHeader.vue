<template>
  <header class="app-header">
    <h2 class="page-title">{{ pageTitle }}</h2>
    <div class="header-actions">
      <LanguageSwitcher />
      <ProfileMenu
        @show-profile-details="emit('show-profile-details')"
        @show-tasks="emit('show-tasks')"
      />
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../../composables/useI18n'
import LanguageSwitcher from '../LanguageSwitcher.vue'
import ProfileMenu from '../ProfileMenu.vue'

export default {
  name: 'AppHeader',
  components: {
    LanguageSwitcher,
    ProfileMenu
  },
  emits: ['show-profile-details', 'show-tasks'],
  setup(props, { emit }) {
    const route = useRoute()
    const { t } = useI18n()

    const pageTitle = computed(() => {
      if (route.meta.labelKey) return t(route.meta.labelKey)
      if (route.meta.label) return route.meta.label
      return t('nav.overview')
    })

    return { pageTitle, emit }
  }
}
</script>

<style scoped>
.app-header {
  height: var(--header-height);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-6);
  flex-shrink: 0;
}

.page-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text);
  letter-spacing: -0.01em;
  line-height: var(--line-height-tight);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
</style>
