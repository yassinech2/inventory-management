<template>
  <aside class="sidebar">
    <div class="sidebar-logo">
      <h1>{{ t('nav.companyName') }}</h1>
      <span>{{ t('nav.subtitle') }}</span>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in items"
        :key="item.to"
        :to="item.to"
        class="nav-item"
        active-class="nav-item--active"
      >
        <!-- overview: grid/dashboard -->
        <svg v-if="item.icon === 'overview'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
        </svg>

        <!-- inventory: package/box -->
        <svg v-else-if="item.icon === 'inventory'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M15 6L9 3L3 6V12L9 15L15 12V6Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          <path d="M9 3V15" stroke="currentColor" stroke-width="1.5"/>
          <path d="M3 6L9 9L15 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>

        <!-- orders: clipboard with list -->
        <svg v-else-if="item.icon === 'orders'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="3" y="2" width="12" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M6 7H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M6 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M6 13H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>

        <!-- demand: trending-up line chart -->
        <svg v-else-if="item.icon === 'demand'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <polyline points="2,13 6,9 10,11 16,4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <polyline points="12,4 16,4 16,8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>

        <!-- finance: dollar sign / wallet -->
        <svg v-else-if="item.icon === 'finance'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="2" y="5" width="14" height="10" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M2 8H16" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="5.5" cy="11.5" r="1" fill="currentColor"/>
        </svg>

        <!-- reports: bar chart / file-text -->
        <svg v-else-if="item.icon === 'reports'" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <rect x="3" y="2" width="9" height="14" rx="1.5" stroke="currentColor" stroke-width="1.5"/>
          <path d="M6 6H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M6 9H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M6 12H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M13 10V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M15.5 12V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>

        <span class="nav-label">{{ item.labelKey ? t(item.labelKey) : item.label }}</span>
      </router-link>
    </nav>
  </aside>
</template>

<script>
import { useI18n } from '../../composables/useI18n'

export default {
  name: 'AppSidebar',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  height: 100vh;
  position: sticky;
  top: 0;
  background: var(--color-sidebar);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-logo {
  height: var(--header-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 var(--space-5);
  border-bottom: 1px solid var(--color-sidebar-border);
  flex-shrink: 0;
}

.sidebar-logo h1 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-sidebar-fg-active);
  letter-spacing: -0.01em;
  line-height: var(--line-height-tight);
}

.sidebar-logo span {
  font-size: var(--font-size-xs);
  color: var(--color-sidebar-fg);
  margin-top: 2px;
  line-height: var(--line-height-tight);
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-3);
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  color: var(--color-sidebar-fg);
  text-decoration: none;
  font-size: var(--font-size-sm);
  font-weight: 400;
  transition: background var(--motion-fast), color var(--motion-fast);
  line-height: var(--line-height-tight);
}

.nav-item:hover {
  background: var(--color-sidebar-hover);
  color: var(--color-sidebar-fg-active);
}

.nav-item--active {
  background: var(--color-sidebar-active);
  color: var(--color-sidebar-fg-active);
  font-weight: var(--font-weight-medium);
  /* Brand accent bar on the left edge */
  box-shadow: inset 3px 0 0 var(--color-brand);
}

.nav-label {
  flex: 1;
}
</style>
